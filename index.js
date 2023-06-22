let localStream;
const st_option = {
  video: true,
  audio: {
      sampleRate: 44100
  }
}
document.getElementById('btn00').onclick = () => {
camera();
function camera() {
navigator.mediaDevices.getDisplayMedia(st_option)
  .then( stream => {
  const v = document.getElementById('myV');
  v.srcObject = stream;
  v.play();
  localStream = stream;
  document.getElementById('shareID').textContent = "接続ID: " + peer.id;
  document.getElementById('myV').innerHTML = `<video id="myV" width="400px" autoplay playsinline controls></video>`
})
}
}
const peer = new Peer({key: 'b2ec5df0-85b1-4e32-965f-072a7379a325'});


document.getElementById('btn').onclick = () => {
    const ID = document.getElementById('ID').value;
    const mediaConnection = peer.call(ID, localStream);
    setEventListener(mediaConnection);
  };
  
  // 相手側のやつ
  const setEventListener = mediaConnection => {
    mediaConnection.on('stream', stream => {
      const v = document.getElementById('shareV')
      v.srcObject = stream;
      v.play();
    });
  }

peer.on('call', mediaConnection => {
    mediaConnection.answer(localStream);
    setEventListener(mediaConnection);
  });
