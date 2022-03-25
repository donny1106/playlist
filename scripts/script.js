new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "They dont know about us",
          artist: "One Direction",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/1.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/1.m4a",
          url: "https://youtu.be/L_Y4V44GW58",
          favorited: false
        },
        {
          name: "Follow you",
          artist: "Bring Me The Horizon",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/2.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/2.m4a",
          url: "https://youtu.be/EfE-tV8Cq00",
          favorited: true
        },
        {
          name: "One thing",
          artist: "One Direction",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/3.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/3.m4a",
          url: "https://youtu.be/FFcdy3P_3v0",
          favorited: false
        },
        {
          name: "This side of paradise",
          artist: "Coyote Theory",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/4.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/4.m4a",
          url: "https://youtu.be/DMahK0KzlPM",
          favorited: false
        },
        {
          name: "Strong",
          artist: "One Direction",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/5.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/5.m4a",
          url: "https://youtu.be/H0MKqqYFm2Q",
          favorited: true
        },
        {
          name: "Happily",
          artist: "One Direction",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/6.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/6.m4a",
          url: "https://youtu.be/EqttswiXCgs",
          favorited: false
        },
        {
          name: "Girl almighty",
          artist: "One Direction",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/7.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/7.m4a",
          url: "https://youtu.be/_6Eyn9ps9bg",
          favorited: true
        },
        {
          name: "Ojos color sol",
          artist: "Calle 13",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/8.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/8.m4a",
          url: "https://youtu.be/QVxzkhgSjXc",
          favorited: false
        },
        {
          name: "Chachachá",
          artist: "Josean Log",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/9.jpeg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/9.m4a",
          url: "https://youtu.be/1Nr_tqkMsJs",
          favorited: false
        },
        {
          name: "Muerte en Hawaii",
          artist: "Calle 13",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/10.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/10.m4a",
          url: "https://youtu.be/ZAjASemgx3E",
          favorited: false
        },
        {
          name: "Follow you",
          artist: "Imagine Dragon",
          cover: "https://raw.githubusercontent.com/Mjtc2323/mp3/main/imagenes/11.jpg",
          source: "https://github.com/Mjtc2323/mp3/raw/main/music/11.m4a",
          url: "https://youtu.be/ZSIJSN30LnA",
          favorited: false
        }
        
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
