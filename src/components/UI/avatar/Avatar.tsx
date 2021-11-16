interface avtProps {
    imageSrc: string;
}

const Avatar = ({imageSrc}: avtProps) => {
    return (
        <div>
            <img src={imageSrc} alt="#" />
        </div>
    )
}

export default Avatar
