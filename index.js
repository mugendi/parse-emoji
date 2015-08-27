
var Retext = require('retext');
var emoji = require('retext-emoji');
var walk = require('retext-walk');

var retext = new Retext()
            .use(walk)
            .use(emoji, { 'convert': 'decode' }) ;

module.exports=function(text,callback){

    if(typeof text=='string'){
        text=' '+text+' ';
    }
    else{
        return callback({});
    }

    // console.log(tree); 
    var nodes=[],
        txt='',
        emoji='';

    retext.parse(text, function (err, tree) {      

        txt=tree.toString();

        
        // console.log(tree.toString())
        tree.tail.walkBackwards('EmoticonNode',function(node){
            
            emoji=node.toString()
            nodes.push({
                "name" : node.data.names,
                "tags" : node.data.tags,
                "emoji" : emoji 
            });

            txt=txt.replace(emoji ,'{EMOJI: '+ emoji.replace(/:/g,'') +'}');

        });


        var obj={
                    emojis:nodes.reverse(),
                    string:{
                        in:text,
                        out:tree.toString(),
                        annotated:txt
                    }
                }

       return callback(obj)

    });    
}




