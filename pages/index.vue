<template>
  <div class="index">
    <div class="tags">
      <button
        v-for="(tag, index) in $options.tagsData"
        :key="index"
        class="tagsItem"
        :data-active="$data[`tag${tag.key}`]"
        @click="toggleTag(tag.key)"
      >
        {{ tag.name }}
      </button>
    </div>
    <ul class="list">
      <li v-for="(s, index) in songs" :key="index" class="listItem">
        <span>{{ s.title }}</span> <i>{{ s.artist }}</i>
        <strong>{{ s.bpm }}bpm</strong>
      </li>
    </ul>
  </div>
</template>

<script>
import songsJson from '../data/json/index.json';

export default {
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
  tagsData: [
    {
      name: 'Langue: Français',
      key: 'LangFR',
    },
    {
      name: 'Langue: Anglais',
      key: 'LangEN',
    },
    {
      name: 'Langue: Latino',
      key: 'LangLA',
    },
    {
      name: 'Famille: ANNEES 80 / 90 / DISCO',
      key: 'FamANN',
    },
    {
      name: 'Famille: DANCE / ELECTRO / TECHNO',
      key: 'FamDAN',
    },
    {
      name: 'Famille: FUNK / SOUL',
      key: 'FamFUN',
    },
    {
      name: 'Famille: RNB / HIP HOP / VARIETE',
      key: 'FamRNB',
    },
    {
      name: 'Famille: REGGAE',
      key: 'FamREG',
    },
    {
      name: 'Famille: ROCK / HARD',
      key: 'FamROC',
    },
    {
      name: 'Famille: ROCK N ROLL',
      key: 'FamRNR',
    },
    {
      name: 'Famille: SLOW',
      key: 'FamSLO',
    },
  ],
  data() {
    return {
      noLangSelected: true,
      tagLangFR: false,
      tagLangEN: false,
      tagLangLA: false,
      noFamilySelected: true,
      tagFamANN: false,
      tagFamDAN: false,
      tagFamFUN: false,
      tagFamRNB: false,
      tagFamREG: false,
      tagFamROC: false,
      tagFamRNR: false,
      tagFamSLO: false,
    };
  },
  computed: {
    songs() {
      return songsJson.sort(this.compare).filter((song) => {
        return (
          (this.noLangSelected ||
            (this.tagLangFR && song.lang === 'FR') ||
            (this.tagLangEN && song.lang === 'EN') ||
            (this.tagLangLA && song.lang === 'LATINO')) &&
          (this.noFamilySelected ||
            (this.tagFamANN && song.family === 'ANNEES 80 / 90 / DISCO') ||
            (this.tagFamDAN && song.family === 'DANCE / ELECTRO / TECHNO') ||
            (this.tagFamFUN && song.family === 'FUNK / SOUL') ||
            (this.tagFamRNB && song.family === 'RNB / HIP HOP / VARIETE') ||
            (this.tagFamREG && song.family === 'REGGAE') ||
            (this.tagFamROC && song.family === 'ROCK / HARD ROCK') ||
            (this.tagFamRNR && song.family === 'ROCK N ROLL') ||
            (this.tagFamSLO && song.family === 'SLOW'))
        );
      });
    },
  },
  methods: {
    compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const songA = this.regularFirstLetter(a.title.toUpperCase());
      const songB = this.regularFirstLetter(b.title.toUpperCase());

      let comparison = 0;
      if (songA > songB) {
        comparison = 1;
      } else if (songA < songB) {
        comparison = -1;
      }
      return comparison;
    },
    regularFirstLetter(str) {
      let txt = str;
      if (txt.startsWith('ç') || txt.startsWith('Ç')) {
        txt = `C${txt.substring(1)}`;
      }
      return txt;
    },
    toggleTag(key) {
      this[`tag${key}`] = !this[`tag${key}`];
      this.noLangSelected =
        !this.tagLangFR && !this.tagLangEN && !this.tagLangLA;
      this.noFamilySelected =
        !this.tagFamANN &&
        !this.tagFamDAN &&
        !this.tagFamFUN &&
        !this.tagFamRNB &&
        !this.tagFamREG &&
        !this.tagFamROC &&
        !this.tagFamRNR &&
        !this.tagFamSLO;
    },
  },
};
</script>

<style lang="postcss">
body {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  font-weight: 400;
}
.index {
  background: white;
  display: flex;
}
.list {
  flex: 1 1 auto;
  list-style-type: none;
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow-y: scroll;
  &Item {
    margin: 0;
    padding: 10px 70px 10px 10px;
    border-bottom: 1px solid #eee;
    position: relative;
    &:nth-child(odd) {
      background: rgba(0, 0, 0, 0.02);
    }
    & > span {
      display: block;
    }
    & > i {
      opacity: 0.5;
      font-size: 0.9em;
      display: block;
    }
    & > strong {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 0.8em;
    }
  }
}
.tags {
  flex: 0 0 100px;
  overflow-y: scroll;
  &Item {
    width: 100%;
    height: 50px;
    &[data-active] {
      background: yellow;
    }
  }
}
</style>
