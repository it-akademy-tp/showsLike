$(document).ready(function() {

  $('body').on('click', '[data-use="myFavorite"] li', function() {
    debugger;
    var url = $(this).data('url');
    rqt(url);
  });




  // se declanche quand on clic sur le bouton SEND
  $('body').on('click', 'input[type="button"]', function() {
    // Récupere la valeur saisie et la sauvegarde dans une variable
    var saisieUser = $('[data-use="input"]').val();
    // On concatene l'adresse de l'api avec la saisie de l'utilisateur
    var url = "http://api.tvmaze.com/singlesearch/shows?q=" + saisieUser;

    rqt(url);
  });

  function rqt(url){
      // va nous afficher le resulat de la requete
      $.ajax({
        // on lui donne l'url concaténé
        url: url
        }).done(function(data) {
          var renderGenre;
          var renderDiffusion;
          var renderNote;
          var renderWebsite;
          var renderSynopsis;
          var renderTitle = "<h2>" + data.name + "</h2>";




          $.each(data.genres, function(index, value) {
            renderGenre = "<span>"+value+"</span>";
            // each sur value-1 affcige span avec /
          })

          renderDiffusion = "<span>Diffusion : </span><span>"+data.premiered+"</span>";
          renderNote = "<span>"+data.rating.average+"</span>";
          renderWebsite = '<a href="#">site</a>';
          renderSynopsis = "<p>"+data.summary+"</p>"





          var htmlRenderBtnAdd = '<input id="addfav" type="button" name="" value="add favorite">';
          var htmlRenderBtnRmv = '<input id="rmvfav" type="button" name="" value="Rmv favorite">';



          // On envoie le resultat sur notre page qui a la div data-use=result
          $('.title').html(renderTitle);
          $('.genre').html(renderGenre);
          $('.diffusion').html(renderDiffusion);
          $('.note').html(renderNote);
          $('.website').html(renderWebsite);
          $('.Synopsis').html(renderSynopsis);





          var edit = "fav_"+data.name;
          existLocalSto();
          //Event listenner sur le bouton add favorite
          $('body').on('click', '#addfav', function() {

            localStorage.setItem(edit, url);
            existLocalSto();

            });

          //Event listenner sur le bouton rmv favorite
          $('body').on('click', '#rmvfav', function() {
            localStorage.removeItem(edit);
            existLocalSto();

            });

            function existLocalSto(){
            if (localStorage.getItem(edit)) {
              $('.button').html(htmlRenderBtnRmv);
              displayFav();

            }else {
              $('.button').html(htmlRenderBtnAdd);
              displayFav();

            }
          }
        });
    };



      displayFav();
      //// FAVORITE /// /
      function displayFav(){
      var htmlRenderFav ="<ul>";

      $.each(localStorage, function(key, value){
        if(key != 'length' && key.match('fav_')) {

          htmlRenderFav += "<li data-url="+ value +">"+ key.replace('fav_', ''); +"</li>";
        }
      });
          htmlRenderFav += "</ul>";

      $('.favoris').html(htmlRenderFav);
    };
  });
