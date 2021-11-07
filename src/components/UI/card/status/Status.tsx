
interface statusProps {
    content: string;
    status: string; //none, coming, outdate
}

const Status = ({content, status}: statusProps) => {

    return (
        <div className={'status status--' + status}>
            {content}
        </div>
    )
}

export default Status
