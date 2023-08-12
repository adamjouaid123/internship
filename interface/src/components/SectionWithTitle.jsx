export default function SectionWithTitle(props) {
    return <div style={{
      padding: "10px",
      marginBottom: 10,
      backgroundColor: "#eee",
      borderRadius: "20px"
    }}>
      <div style={{
        fontSize: "30px",
        color: "#023047",
        fontWeight: "bold",
        padding: "10px",
        marginBottom: "10px"
      }}>{props.title}</div>
  
      {props.children}
    </div>
  
  }