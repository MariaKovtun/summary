import image from '../assets/img/banner.jpg'

const Banner = () => {
    return (
        <div className="banner">
        <img src={image} className="img-fluid" alt="К весне готовы!"></img>
        <h2 className="banner-header">К весне готовы!</h2>
      </div>
      )
}

export default Banner;
