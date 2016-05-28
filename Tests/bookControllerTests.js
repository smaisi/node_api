var should = require('should'),
    sinon = require('sinon');
    
describe('Book Controller Tests:', function() {
    describe('Post',function() {
      it('should not allow for any books',function() {
          var Book = function(book){this.save = function(){}};
          var req = {
              body: {
                author: 'Jon'    
              }
          }
      var res = {
          status: sinon.spy(),
          send: sinon.spy()
      }      
        var bookController = require('../Controllers/bookController')(Book);
        bookController.post(req,res);
        res.status.calledWith(400).should.equal(true,'Bad Status ' + res.status.args);
        res.send.calledWith('Title is required').should.equal(true);
        })  
    })
});