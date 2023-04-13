function NumberCircle({ number, backgroundColor, textColor }) {
  const circleSize = 80
  return (
    <div
      style={{
        color: textColor || 'black',
        display: 'inline-block',
        margin: `${circleSize * 0.12}px ${circleSize * 0.12}px ${circleSize * 0.34}px`,
        width: `${circleSize}px`,
        height: `${circleSize}px`,
        borderRadius: '50%',
        border: `${circleSize * 0.05}px solid black`,
        textAlign: 'center',
        fontSize: `${circleSize * 0.4}px`,
        lineHeight: `${circleSize * 0.9}px`,
        backgroundColor: backgroundColor || 'white',
      }}
    >
      {number}
    </div>
  )
}

export default NumberCircle