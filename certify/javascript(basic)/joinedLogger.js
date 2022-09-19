function joinedLogger(level, sep) {  
  return (...msg) => {
    var s=[]
    msg.forEach(arg => {
      if(arg.level>=level)
      {
        s.push(arg.text)
      }
    });
    ws.write(s.join(sep))
  }
}