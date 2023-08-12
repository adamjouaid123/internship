export default function InputBlock(props) {
    return <div style={{
        display: "flex",
        gap: "10px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        fontSize: 20
    }}
    >
        {props.children}
    </div>

}