// components/ImageCarousel.jsx
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function ImageCarousel() {
  return (
    <div className="w-full shadow-xl">
      <Carousel 
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={5000}
        showStatus={false}
        showArrows={true}
        stopOnHover={true}
        swipeable={true}
        dynamicHeight={false}
        emulateTouch={true}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-white"
            >
              ❮
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              title={label}
              className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full w-10 h-10 flex items-center justify-center text-white"
            >
              ❯
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className={`inline-block w-3 h-3 mx-1 rounded-full transition-colors ${
              isSelected ? 'bg-white' : 'bg-white/50'
            }`}
          />
        )}
      >
        {/* Slide 1 */}
        <div className="relative h-80 md:h-[690px] w-full">
          <img 
            src="/images/aws.jpg" 
            alt="Promoción 1" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-8 md:pb-12 px-6 md:px-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">LANZAMIENTO</h3>
              <p className="text-white text-sm md:text-lg">Descubre el nuevo servicio de AWS</p>
              <button className="mt-4 bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
                Ver colección
              </button>
            </div>
          </div>
        </div>
        
        {/* Slide 2 */}
        <div className="relative h-80 md:h-[690px] w-full">
          <img 
            src="/images/Azure.png" 
            alt="Promoción 2" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-8 md:pb-12 px-6 md:px-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">TENDENCIAS 2025</h3>
              <p className="text-white text-sm md:text-lg">Las últimas novedades para Servicios Cloud</p>
              <button className="mt-4 bg-white text-gray-800 hover:bg-gray-100 px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
                Explorar tendencias
              </button>
            </div>
          </div>
        </div>
        
        {/* Slide 3 */}
        <div className="relative h-80 md:h-[690px] w-full">
          <img 
            src="/images/hosting.png" 
            alt="Promoción 3" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end pb-8 md:pb-12 px-6 md:px-12">
            <div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">OFERTAS ESPECIALES</h3>
              <p className="text-white text-sm md:text-lg">Hasta 40% de descuento en hostings</p>
              <button className="mt-4 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-md font-medium transition-colors cursor-pointer">
                Ver ofertas
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default ImageCarousel;