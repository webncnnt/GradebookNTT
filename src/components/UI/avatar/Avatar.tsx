interface avtProps {
    imageSrc: string;
}

const Avatar = ({imageSrc}: avtProps) => {
    return (
        <div className='avt'>
            <img src={imageSrc} alt="#" />
        </div>
    )
}

export default Avatar
