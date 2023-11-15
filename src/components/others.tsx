import "../assets/styles/others.scss"

interface OthersProps{

}

const Others: React.FC<OthersProps> = ({}) =>{
    return (
        <div className="others-continer" style={{}}>
            <div className="options" style={{ }}>
                <div className="option-btn-left option-btn-active" style={{ }}>Hourly</div>
                <div className="option-btn-right" style={{ }}>Daily</div>
            </div>
            <div style={{ width: "100%"}}>

            </div>
        </div>
    );
}

export default Others;