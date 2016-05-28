var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'); 
    
var mongoose = require('mongoose'),
    Book = mongoose.model('Books'),
    agent = request.agent(app);
    
   
describe('Book CRUD Test',function() {
    it('Should allow a book to be posted and returned a read and _id', function(done){
        var bookPost = {title: 'new Book', author:'John', genre: 'Fiction'};
        var temp = agent.post('/api/Books').send(bookPost);
      
        temp
        .expect(200)
        .end(function(err,results){
            results.body.read.should.equal(false);
            results.body.should.have.property('_id');
            done()
        })
    })
    
    afterEach(function(done){
        Book.remove().exec();
        done();
    })
})