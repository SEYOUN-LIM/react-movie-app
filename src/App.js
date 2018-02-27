import React, { Component } from 'react';
import './App.css';
import Movie from './Movie';

class App extends Component {

  // Render: componentWillMount() -> render() -> componentDidMount()
  // Update: componentWillReceiveProps()-> shouldComponentUpdate() -> componentWillUpdate() 
  // -> render() -> componentDidUpdate()

  state = {

  }

  componentDidMount(){
    this._getMovies();
    // setTimeout(() => {
    //   this.setState({
    //     movies: [
    //       { title: "Matrix", poster: "https://images-na.ssl-images-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UY1200_CR84,0,630,1200_AL_.jpg"},
    //       { title:"Batman", poster:"https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Batman_Detective_Comics_Vol_2_1.png/250px-Batman_Detective_Comics_Vol_2_1.png"},
    //       { title:"Oldboy", poster:"http://www.languagetrainers.com/reviews/foreign-film-reviews/uploads/9214-Oldboy.jpg"},
    //       { title:"Star wars", poster:"https://upload.wikimedia.org/wikipedia/ko/thumb/6/6a/%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg/250px-%EC%8A%A4%ED%83%80%EC%9B%8C%EC%A6%88_%EA%B9%A8%EC%96%B4%EB%82%9C_%ED%8F%AC%EC%8A%A4.jpg"},
    //       { title: "Trainspotting", poster: "http://barkerhost.com/wp-content/uploads/sites/4/2016/02/trainspotting.jpg"}
    //     ],
    //   })
    // }, 1000);
  }
  _renderMovies = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <Movie 
          title={movie.title}
          genres={movie.genres} 
          poster={movie.medium_cover_image} 
          synopsis={movie.synopsis}
          key={movie.id} 
        />)
    })
    return movies
  }

  _getMovies = async () => {
    const movies = await this._callApi()
    console.log(movies);
    this.setState({
      movies
    })
  }

  _callApi = () => {
    return fetch('https://yts.am/api/v2/list_movies.json?sort_by=rating')
    .then(res => res.json())
    .then(json => json.data.movies)
    .catch(err => console.log(err))
  }

  render() {
    const {movies} = this.state;
    return (
      <div className={movies ? "App" : "App--loading"}>
        {movies ? this._renderMovies() : 'Loading...' }
      </div>
    );
  }
}

export default App;
