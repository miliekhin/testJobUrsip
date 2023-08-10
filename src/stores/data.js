import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {parseInteger} from "jsdom/lib/jsdom/living/helpers/strings";

export const useDataStore = defineStore('data', () => {
  const rawData = ref([
    {'Data1': [186, 186, 92, 8, 1]},
    {'Data2': [95, 95, 31, 11, 0]},
    {'Data3': [329, 329, 256, 32, 4]},
    {'Data4': [804, 804, 697, 40, 22]},
  ]);
  const filtersSearch = ref([]);
  const filterOddEven = ref('');
  const sorting = ref({column: null, asc: false})
  const data = computed(() => rawData.value.filter((itm, i) => {
        if (filterOddEven.value) {
          if (i % 2 === 0) {
            if (filterOddEven.value === 'odd') {
              return itm;
            }
          } else if (filterOddEven.value === 'even') {
            return itm;
          }
        } else {
          return itm;
        }
      }).filter((itm) => {
        if (filtersSearch.value.every(fl => !fl)) {
          return itm;
        }
        for(let [i, flt] of filtersSearch.value.entries()) {
          if (!i) {
            if(flt && Object.keys(itm)[0].toLowerCase().includes(flt.toLowerCase())) {
              return itm;
            }
          } else if (flt !== undefined && flt.length && parseInteger(flt, 10) === itm[Object.keys(itm)[0]][i-1]) {
            return itm;
          }
        }
      }).sort((itm1, itm2) => {
        if (sorting.value.column === 0) {
          const ascWay = asc => asc ? itm1 : itm2;
          return Object.keys( ascWay(sorting.value.asc) )[0].localeCompare(Object.keys( ascWay(!sorting.value.asc) )[0]);
        } else if (sorting.value.column !== null) {
          const clmn = sorting.value.column - 1;
          const i1 = itm1[Object.keys(itm1)[0]][clmn];
          const i2 = itm2[Object.keys(itm2)[0]][clmn];
          return sorting.value.asc ? i1 - i2 : i2 - i1;
        }
      })
  )
  function setSort(colI){
    if ( !data.value.length ) {
      return;
    }
    if (sorting.value.column !== colI) {
      sorting.value.asc = true;
    } else {
      sorting.value.asc = !sorting.value.asc;
    }
    sorting.value.column = colI;
  }
  function setOddEvenFilter(val){
    filterOddEven.value = val;
  }
  function setSearchFilter(id, val) {
    filtersSearch.value[id] = val;
  }

  return {
    rawData,
    data,
    sorting,
    filtersSearch,
    filterOddEven,
    setOddEvenFilter,
    setSearchFilter,
    setSort,
  };
})
