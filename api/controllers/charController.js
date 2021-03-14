const routes = require('../routes/charRoute');
const axios = require('axios');


module.exports = {
  findHeros: function (req, res) {
    var heros = [{
      name: 'Deadpool',
      description: 'Deadpool é um anti-herói complexo, muitas vezes desagradável para os restantes humanos e completamente insano. Mas a verdade é que, apesar de tudo, o Mercenário Tagarela conseguiu conquistar um pouco de todos nossos corações com seu altruísmo e senso de humor.',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99'
    },
    {
      name: 'Thor',
      description: 'Thor Odinson é o Deus do Trovão, defensor tanto de Asgard como da Terra, e um dos fundadores dos Vingadores. O personagem foi criado por Stan Lee e Jack Kirby, que procuravam criar um super-herói mais forte do que qualquer humano. A resposta foi fácil: eles iriam então criar um deus. Como o público já se encontrava bastante familiarizado com o panteão grego e romano, a dupla decidiu explorar a mitologia nórdica. E assim nasceu Thor, o super-herói viking.',
      image: 'http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350'      
    }]
    res.render('home', {heros});
  },

  findStories: function (req, res){
    async function makeGetRequest() {
      var hero = req.params.name;
      if(hero == 'Thor'){
        const response = await axios.get("https://gateway.marvel.com/v1/public/characters/1009664/comics?&ts=1&titleStartsWith=Thor%3A%20God%20of%20Thunder&limit=2&apikey=7b73e6dd24f6573f6108ac83a8d34ae9&hash=d0802fa007ef6725f00cee6ea360acd4")
        return [{
          title: response.data.data.results[0].title, 
          description: response.data.data.results[0].description, 
          image: response.data.data.results[0].thumbnail.path+'.jpg' 
         },
         {
         title: response.data.data.results[1].title, 
         description: response.data.data.results[1].description,
         image: response.data.data.results[0].thumbnail.path+'.jpg'
        }]
      }else if(hero == 'Deadpool'){
        const response = await axios.get("https://gateway.marvel.com/v1/public/characters/1009268/comics?ts=1&dateRange=2014-01-01%2C2015-01-02&titleStartsWith=Deadpool&orderBy=title&limit=2&apikey=7b73e6dd24f6573f6108ac83a8d34ae9&hash=d0802fa007ef6725f00cee6ea360acd4");
        return [{
          title: response.data.data.results[0].title, 
          description: response.data.data.results[0].description, 
          image: response.data.data.results[0].thumbnail.path+'.jpg' 
         },
         {
         title: response.data.data.results[1].title, 
         description: response.data.data.results[1].description,
         image: response.data.data.results[0].thumbnail.path+'.jpg'
        }]
      }
    }
    
    var title = Promise.resolve(makeGetRequest());

    title.then(function(v){
      res.render('stories', { v })
    })
  }
}
