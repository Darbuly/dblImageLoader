   function each(arr, callback) {//相同
      var length = arr.length;
      var i;

      for (i = 0; i < length; i++) {
        callback.call(arr, arr[i], i, arr);
      }

      return arr;
    }

    window.addEventListener('DOMContentLoaded', function () {//从页面空白到展示出页面内容，会触发DOMContentLoaded事件
      var avatar = document.getElementById('avatar');//上传图片
      var image = document.getElementById('image');//模态主图片
      var input = document.getElementById('input');//图片存储
      var $progress = $('.progress');//进度条处理
      var $progressBar = $('.progress-bar');//进度条处理
      var $alert = $('.alert');//提示信息
      var $modal = $('#modal');//模态框
      var cropper;
      
      $('[data-toggle="tooltip"]').tooltip();

      input.addEventListener('change', function (e) {//图片加载事件
        //var files = e.target.files;//
        var files = this.files;//
        var done = function (url) {//
          input.value = '';
          image.src = url;
          $alert.hide();

          $modal.modal('show');

        };
        var reader;
        var file;
        var url;

        if (files && files.length > 0) {
          //文件有效
          file = files[0];

          if (URL) {
            done(URL.createObjectURL(file));
          } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
              done(reader.result);
            };
            reader.readAsDataURL(file);
          }
        }
      });

      $modal.on('shown.bs.modal', function () {//模态框显示处理
        cropper = new Cropper(image, {//新建crop
          aspectRatio:aRatio,//crop的默认比例1:1
          viewMode: VM,
          //编写改变处理函数
          crop:function(e){
              var cropper=this.cropper;
              var canvasWidth=cropper.getData(1).width;
              var canvasHeight=cropper.getData(1).height;
              $("#dataWidth").attr('value',parseInt(canvasWidth*$('#dataQuality').val()*0.01));
              $("#dataHeight").attr('value',parseInt(canvasHeight*$('#dataQuality').val()*0.01));
          },

        });
      }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
      });

      document.getElementById('crop').addEventListener('click', function () {//裁剪并上传事件处理
        var initialAvatarURL;
        var canvas;

        $modal.modal('hide');

        if (cropper) {
          canvas = cropper.getCroppedCanvas({//上传图片的比例设置
            width: $("#dataWidth").val(),
            height: $("#dataHeight").val(),
            imageSmoothingQuality:canvasQuality,
          });

          initialAvatarURL = avatar.src;
          avatar.src = canvas.toDataURL();//替换预览图片
          $progress.show();//显示进度条
          $alert.removeClass('alert-success alert-warning');//重置提示信息属性
          canvas.toBlob(function (blob) {
            var formData = new FormData();

            formData.append('avatar', blob);
            //上传图片到服务器
            $.ajax(LoaderUrl+"php/upLoad.php", {
              method: 'POST',
              data: formData,
              processData: false,
              contentType: false,

              xhr: function () {
                var xhr = new XMLHttpRequest();
                //进度条处理
                xhr.upload.onprogress = function (e) {
                  var percent = '0';
                  var percentage = '0%';

                  if (e.lengthComputable) {
                    percent = Math.round((e.loaded / e.total) * 100);
                    percentage = percent + '%';
                    $progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
                  }
                };
                return xhr;
              },

              success: function (data) {
                $('#imgUrl').val(data);
                $alert.show().addClass('alert-success').text('上传图片成功！');

              },

              error: function () {
                avatar.src = initialAvatarURL;
                $alert.show().addClass('alert-warning').text('上传图片失败！');
              },

              complete: function () {
                $progress.hide();
              },
            });


          });
        }
      });
    });