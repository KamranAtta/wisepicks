import { createStyles } from './utils';

export const styles = createStyles({
    header: {
        paddingInline: '0px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100vw',
        background: 'white',
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10px'
    },
    searchBarContainer: {
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    logo:{
        display:'flex',
        justifyContent: 'center', 
        padding:'20px'
    },
    card: {
        paddingBottom:'10px',
    },
    playButton: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
    paragraph: {
        paddingTop:'10px'
    },
    gridStyle: {
        width: '25%',
        textAlign: 'center',
    },
    watchButton: {
        position: 'absolute',
        bottom: '20px',
        right:'10px',
        background:'black',
        color: 'white',
        height: '40px',
        borderRadius: '5px',
    },
    categoryButton: {
        borderRadius: '5px',
    },
    selectedCategoryButton: {
        background:'black',
        color: 'white',
        borderRadius: '5px',
    },
    link: {
        color: 'black'
    },
    duration: { 
        bottom: '30px', 
        color: '#fff', 
        paddingRight: '20px', 
        borderRadius: '4px' 
    },
    relatedVideosImage: {
        borderRadius: '10px',
        width: '200px',
        height: '120px',
    },
    relatedVideosImageMobile: {
        borderRadius: '10px',
        width: '170px',
        height: '120px',
    },
    bRadius:{
        borderRadius: '10px',
    },
    textWhite: {
        color: 'white'
    },
    Tag: {
        color: '#2020ad',
        border: 'none'
    },
    commentSection: {
        paddingTop: '12px',
    }
});