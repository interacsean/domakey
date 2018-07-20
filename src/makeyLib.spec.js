const makeyLib = require('./makeyLib');
const readline = require('readline');
const fs = require('fs');
const io = require('./io');

jest.mock('./io');

jest.mock('readline');
let mockResponse = '';
const mockRLQuestion = jest.fn().mockImplementation(function(q, cb) {
  cb(mockResponse);
});
readline.createInterface.mockReturnValue({
  question: mockRLQuestion,
});

jest.mock('fs');

describe('makeyLib', function() {
  beforeEach(function() {
    jest.clearAllMocks();
  });

  describe('ask', function() {
    test('asks question', async function(done) {
      mockResponse = 'innit';
      const response = await makeyLib.ask('My question is here');

      expect(mockRLQuestion).toHaveBeenCalledWith('My question is here ', expect.any(Function));
      expect(response).toEqual('innit');
      done();
    });
  });

  describe('askYN', function() {
    test('asks YN question', async function(done) {
      mockResponse = 'yes';
      const response = await makeyLib.askYN('My question is here');

      expect(mockRLQuestion).toHaveBeenCalledWith('My question is here (Y/n) ', expect.any(Function));
      expect(response).toBe(true);
      done();
    });

    test('asks YN question with yes as default', async function(done) {
      mockResponse = '';
      const response = await makeyLib.askYN('My question is here');

      expect(mockRLQuestion).toHaveBeenCalledWith('My question is here (Y/n) ', expect.any(Function));
      expect(response).toBe(true);
      done();
    });

    test('asks YN question with no as default', async function(done) {
      mockResponse = '';
      const response = await makeyLib.askYN('My question is here', false);

      expect(mockRLQuestion).toHaveBeenCalledWith('My question is here (y/N) ', expect.any(Function));
      expect(response).toBe(false);
      done();
    });

    test('asks YN question with no as default and y overrides', async function(done) {
      mockResponse = 'y';
      const response = await makeyLib.askYN('My question is here', false);

      expect(mockRLQuestion).toHaveBeenCalledWith('My question is here (y/N) ', expect.any(Function));
      expect(response).toBe(true);
      done();
    });
  });

  describe('print', function() {
    test('calls console log', function() {
      const toPrint = 'My statement here'
      const response = makeyLib.print(toPrint);

      expect(io.printToTerminal).toHaveBeenCalledWith(toPrint)
    });
  });

  describe('printHeading', function() {
    test('calls console log', function() {
      const toPrint = 'My statement here'
      const response = makeyLib.printHeading(toPrint);

      expect(io.printToTerminal).toHaveBeenCalledWith(`\n=== ${toPrint} ===`)
    });
  });

  describe('nl', function() {
    test('calls console log', function() {
      const response = makeyLib.nl();

      expect(io.printToTerminal).toHaveBeenCalledWith('')
    });
  });

  describe('createFile:separateParams', function() {
    const fileName = 'createPath/to.file';
    const body = `<html>
      <div>create</div>
    </html>`;

    test('calls writeFileSync', function() {
      fs.writeFileSync.mockReturnValueOnce(true);
      fs.existsSync.mockReturnValueOnce(true);
      const response = makeyLib.createFile(fileName, body);

      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, body);
      expect(response).toBe(true);
    });

    test('calls writeFileSync needs mkdir', function() {
      fs.writeFileSync.mockReturnValueOnce(true);
      fs.existsSync.mockReturnValueOnce(false);
      const response = makeyLib.createFile(fileName, body);

      expect(fs.existsSync).toHaveBeenCalledWith('createPath');
      expect(fs.mkdirSync).toHaveBeenCalledWith('createPath');
      expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, body);
      expect(response).toBe(true);
    });
  });
  describe('createFile:objAsParam', function() {
    const fileName = 'createPath/to.file';
    const body = `<html>
      <div>create</div>
    </html>`;

    test('calls writeFileSync', function() {
      fs.writeFileSync.mockReturnValueOnce(true);
      fs.existsSync.mockReturnValueOnce(true);
      const response = makeyLib.createFile({ fileName, body });

      expect(fs.mkdirSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, body);
      expect(response).toBe(true);
    });

    test('calls writeFileSync needs mkdir', function() {
      fs.writeFileSync.mockReturnValueOnce(true);
      fs.existsSync.mockReturnValueOnce(false);
      const response = makeyLib.createFile({ fileName, body });

      expect(fs.existsSync).toHaveBeenCalledWith('createPath');
      expect(fs.mkdirSync).toHaveBeenCalledWith('createPath');
      expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, body);
      expect(response).toBe(true);
    });
  });

  describe('editFile', function() {
    const fileName = 'editPath/to.file';

    test('calls readFileSync and checks dir', async function(done) {
      fs.existsSync.mockReturnValueOnce(false);
      const edit = jest.fn().mockImplementation(function(s) {
        return `${s}\namended`;
      });
      fs.readFileSync.mockReturnValueOnce({
        toString: function() { return 'index'; }
      });
      fs.writeFileSync.mockReturnValueOnce(true);

      const response = await makeyLib.editFile(fileName, edit);

      expect(fs.readFileSync).toHaveBeenCalledWith(fileName);
      expect(edit).toHaveBeenCalledWith('index');
      expect(fs.existsSync).toHaveBeenCalledWith('editPath');
      expect(fs.writeFileSync).toHaveBeenCalledWith(fileName, 'index\namended');
      expect(response).toBe(true);
      done();
    });

    test('does not write if edit param returns false', async function(done) {
      fs.readFileSync.mockReturnValueOnce({
        toString: function() { return 'index'; }
      });
      const edit = jest.fn().mockReturnValueOnce(false);

      const response = await makeyLib.editFile(fileName, edit);

      expect(fs.readFileSync).toHaveBeenCalledWith(fileName);
      expect(edit).toHaveBeenCalledWith('index');
      expect(fs.existsSync).not.toHaveBeenCalled();
      expect(fs.writeFileSync).not.toHaveBeenCalled();
      expect(response).toBe(true);
      done();
    });
  });

  describe('templateReplace', function() {
    test('Makes replacement of curlies', function() {
      const body = `Some header
{{tmplVar1}} more bit
and then {{tmplVar2}}
finish with {{tmplVar1}}`;
      const bodyReplaced = `Some header
rplVar1 more bit
and then rplVar2
finish with rplVar1`;
      const rpls = {
        tmplVar1: 'rplVar1',
        tmplVar2: 'rplVar2',
      };

      const response = makeyLib.templateReplace(body, rpls);

      expect(response).toBe(bodyReplaced);
    });
  });
});
