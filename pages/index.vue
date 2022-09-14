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
      <li v-for="(s, index) in songs" :key="s.id" class="listItem">
        {{ s.name }} - {{ s.artist }}
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
      name: 'Français',
      key: 'FR',
    },
    {
      name: 'Anglais',
      key: 'EN',
    },
  ],
  data() {
    return {
      noTagsSelected: true,
      tagFR: false,
      tagEN: false,
    };
  },
  computed: {
    songs() {
      return songsJson.sort(this.compare).filter((song) => {
        return (
          this.noTagsSelected ||
          (this.tagFR && song.lang === 'FR') ||
          (this.tagEN && song.lang === 'EN')
        );
      });
    },
  },
  methods: {
    compare(a, b) {
      // Use toUpperCase() to ignore character casing
      const songA = this.regularFirstLetter(a.name.toUpperCase());
      const songB = this.regularFirstLetter(b.name.toUpperCase());

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
      this.noTagsSelected = !this.tagFR && !this.tagEN;
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
  &Item {
    margin: 0;
    padding: 0 10px;
    border-bottom: 1px solid #eee;
    display: flex;
    &:nth-child(odd) {
      background: rgba(0, 0, 0, 0.02);
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
