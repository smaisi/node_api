var express = require('express');

var routes = function (Book) { 
    var bookRouter = express.Router();
    var bookControl = require('../Controllers/bookController')(Book);
    bookRouter.route('')
              .post(bookControl.post)
              .get(bookControl.get);

    bookRouter.use('/:bookId',function(req,res,next){
     Book.findById(req.params.bookId, function(err,book){
         if(err)
                res.status(500).send(err);
            else if(book)
            {
                req.book = book;
                next(); 
            }
            else{
                res.status(404).send('No book found');
            }
     });       
    });
    
    bookRouter.route('/:bookId')
    .get(function(req,res){
                res.json(req.book);
     
    })
     .put(function(req,res){
            req.book.title = req.body.title;
            req.book.author = req.body.author;
            req.book.genre = req.body.genre;
            req.book.read = req.body.read;
            req.book['year_written'] = req.body['year_written'];
            req.book.save(function(err){
            if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
         });     
     })
     .patch(function(req,res){
         for(var p in req.body){
             req.book[p] = req.body[p];
         }
         
         req.book.save(function(err){
             if(err)
                res.status(500).send(err);
            else{
                res.json(req.book);
            }
         });
        })
        .delete(function(req,res){
            req.book.remove(function(err) {
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send("was removed");
                }
            });
        });
    
    
     
    
   return bookRouter;
};

module.exports = routes;