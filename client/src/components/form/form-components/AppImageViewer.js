import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import colors from '../../../styles/colors'  
function AppImageViewer({images}){

    const [photoIndex,setPhotoIndex] = useState(0)
    const [isOpen,setIsOpen] = useState(false)

    return (
      <div>
        <p style={{  
                    color: colors.PRIMARY, 
                    cursor:'pointer',
                    '&:hover': {
                    color: '#1b5a90',
                    },
                }} 
            onClick={() => setIsOpen(true)} variant="contained" color="primary" size="small"
        >
            View
        </p>
        {isOpen && (
          <Lightbox
            style={{zIndex:100000}}
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setIsOpen(false)}
            onMovePrevRequest={() =>
              setPhotoIndex({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              setPhotoIndex({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </div>
    );
}

export default AppImageViewer