const path = require('path');

exports.errorController = (req, res, next)=>{
    // First solution
    // res.status(404).send('<h1>Wrong Ya kbeeeer</h1>');
    //res.status(404).sendFile(path.join(__dirname,'views','error.html'));
    //res.status(404).sendFile(path.join(rootDir,'views','404.html'))
    res.status(404).render('404',{ pageTitle : 'Not Found', path});
 
 }