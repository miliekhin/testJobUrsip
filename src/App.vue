<script setup>
  import { useDataStore } from "@/stores/data";
  import FilterButton from "@/components/FilterButton.vue";
  import IconSort from "@/components/icons/IconSort.vue";
  const store = useDataStore();
  const columns = [...Array(6).keys()];
</script>

<template>
  <header>
    <div class="logo-box">
      <div class="logo">D</div>
      <div class="logo-text">Dashboard</div>
    </div>
  </header>

  <main>
    <div class="filters-row-box">
      <FilterButton
          label="Even rows"
          :is-active="store.filterOddEven === 'even'"
          @click="store.setOddEvenFilter('even')"
      />
      <FilterButton
          label="Odd rows"
          :is-active="store.filterOddEven === 'odd'"
          @click="store.setOddEvenFilter('odd')"
      />
      <FilterButton
          label="All rows"
          :is-active="!store.filterOddEven"
          @click="store.setOddEvenFilter('')"
      />
    </div>
    <div class="table-box">
      <h3>Dashboard</h3>
      <table>
        <tr>
          <th
              v-for="(n, ci) in columns"
              :key="ci"
              @click="store.setSort(ci)"
              :class="{'text-right': n}"
          >
            <IconSort
                v-if="store.data.length && store.sorting.column === ci"
                :asc="store.sorting.asc"
            />
            <span v-if="!n">Data</span>
            <span v-else>Summary{{n}}</span>
          </th>

        </tr>
        <tbody>
          <tr
              v-for="(rd, rdi) in store.data"
              :key="(rdi)"
          >
            <td class="col-data">
              {{ Object.keys(rd)[0] }}
            </td>
            <td
              v-for="(val, vi) in rd[Object.keys(rd)[0]]"
              :key="vi"
              class="col-val text-right"
            >
              {{ val }}
            </td>
          </tr>
        <tr>
          <td v-for="(c, i) in columns" :key="i">
            <input
                type="text"
                :placeholder="!i ? 'Search...' : ''"
                @input="store.setSearchFilter(c, $event.target.value)"
            >
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
  header {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 16px;
    background: var(--white-base);
  }

  .logo-box{
    display: flex;
    align-items: center;
  }
  .logo{
    width: 40px;
    height: 40px;
    color: var(--blue-base);
    border-radius: 10px;
    background: var(--white-base);
    box-shadow: 0px 1px 2px 0px rgba(8, 35, 48, 0.24), 0px 2px 6px 0px rgba(8, 35, 48, 0.16);
    text-align: center;
    text-shadow: 0px 6px 12px rgba(54, 123, 245, 0.16), 0px 16px 24px rgba(54, 123, 245, 0.16);
    font-family: Racing Sans One, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .logo-text{
    color: var(--gray-80, #5E6366);
    font-family: Racing Sans One, serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 116.667% */
    letter-spacing: 0.15px;
    margin-left: 10px;
  }
  .table-box{
    padding-right: 120px;
  }
  table {
    border-collapse: collapse;
  }
  th, td {
    border-bottom: 1px solid #E3E5E5;
    text-align: left;
    height: 64px;
  }
  .text-right{
    text-align: right;
  }
  td{
    font-size: 20px;
  }
  th{
    color: var(--gray-60);
    cursor: pointer;
    user-select: none;
  }
  .col-data{
    font-weight: 500;
    color: var(--dark-color);
  }
  .col-val{
    font-weight: 500;
    color: var(--gray-80);
  }
  th:first-child, td:first-child{
    width: 330px;
  }
  main{
    display: flex;
  }
  .filters-row-box{
    display: flex;
    flex-direction: column;
    width: 388px;
    padding: 32px 64px;
  }
  h3{
    font-family: Quicksand, sans-serif;
    font-weight: 500;
    font-size: 34px;
    margin: 20px 0;
  }
  input[type="text"]{
    height: 32px;
    background: transparent;
    border: 1px solid var(--gray-40);
    border-radius: 10px;
    margin: auto;
    width: 95%;
    padding: 0 10px;
  }
</style>
