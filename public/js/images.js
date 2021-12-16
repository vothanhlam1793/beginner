function getFile(idInputFile){
    b = jQuery("#" + idInputFile);
    return b[0].files[0];
}
function uploadFile(idInputFile, cb){
    var a = new FormData();
    a.append('sampleFile', getFile(idInputFile))
    jQuery.ajax({
        url: '/upload',
        data: a,
        cache: false,
        enctype: 'multipart/form-data',
        contentType: false,
        processData: false,
        method: 'POST',
        type: 'POST', // For jQuery < 1.9
        success: function(data){
            if(typeof cb == "function"){
                cb(data);
            }
        }
    });
}

var Image = Backbone.Model.extend({
    urlRoot: "/api/images"
})

class CretaImage extends Image {
    constructor(id){
        super();
        console.log(id);
        this.onUpdateData = ()=>{};
        this.idFile = id;
    }
    upload = () => {
        var that = this;
        uploadFile(this.idFile, function(d){
            if(d.link){
                that.set("link", d.link);
                that.save({},{
                    success: function(){
                        that.onUpdateData();
                    }
                })
            }
        });
    }
}