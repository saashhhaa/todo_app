<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr
          v-for="headerGroup in table.getHeaderGroups()"
          :key="headerGroup.id"
        >
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :class="`col-${header.column.id}`"
          >
            <template
              v-if="
                header.column.id === 'isDone' || header.column.id === 'delete'
              "
            ></template>

            <template v-else>
              {{ t(header.column.columnDef.header as string) }}
            </template>
          </th>
        </tr>
      </thead>

      <RecycleScroller
        component="tbody"
        class="table-scroller"
        :items="table.getRowModel().rows"
        :item-size="56"
        key-field="id"
        v-slot="{ item: row }"
      >
        <tr :key="row.id" :class="{ 'row-done': row.original.isDone }">
          <td
            v-for="cell in row.getVisibleCells()"
            :key="cell.id"
            :class="`col-${cell.column.id}`"
          >
            <template v-if="cell.column.id === 'isDone'">
              <img
                @click="tasksStore.switchTaskState(row.original.id)"
                class="status-icon"
                :src="cell.getValue() ? doneIcon : activeIcon"
                alt="status"
              />
            </template>

            <template v-else-if="cell.column.id === 'title'">
              <span :class="{ 'line-through': row.original.isDone }">
                {{ cell.getValue() }}
              </span>
            </template>

            <template v-else-if="cell.column.id === 'category'">
              <span class="table-cat" :style="{ color: row.original.catCol }">
                <span
                  class="cat-dot"
                  :style="{ backgroundColor: row.original.catCol }"
                ></span>
                {{ cell.getValue() }}
              </span>
            </template>

            <template v-else-if="cell.column.id === 'date'">
              {{
                cell.getValue()
                  ? formatTaskDate(cell.getValue() as string)
                  : "—"
              }}
            </template>

            <template v-else-if="cell.column.id === 'delete'">
              <img
                @click="
                  handleDeleteTask(row.original.id, row.original.category)
                "
                class="deleteTask"
                src="/deleteIcon.svg"
                alt="delete"
              />
            </template>
          </td>
        </tr>
      </RecycleScroller>
    </table>
  </div>
</template>

<script setup lang="ts">
import {
  useVueTable,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/vue-table";
import { useCategoriesStore, useTasksSStore } from "../stores/store.js";

import doneIcon from "../assets/doneIcon.svg";
import activeIcon from "../assets/circleIcon.svg";
import { useI18n } from "vue-i18n";

const props = defineProps<{
  tasksList: any[];
}>();

const tasksStore = useTasksSStore();

interface TaskItem {
  id: number;
  userId: number;
  title: string;
  date: string;
  category: string;
  catCol: string;
  isDone: boolean;
}

const { locale, t } = useI18n();

const categoriesStore = useCategoriesStore();
import dayjs from "dayjs";

function formatTaskDate(rawDate: string) {
  if (!rawDate) return "";
  const dateObj = dayjs(rawDate);
  if (!dateObj.isValid()) return "";
  return dateObj.locale(locale.value).format("D MMMM");
}

function handleDeleteTask(id: number, categoryName: string) {
  tasksStore.deleteTask(id);
  const catAmount = categoriesStore.categories.find(
    (cat) => cat.title === categoryName,
  );
  if (catAmount) {
    catAmount.count -= 1;
  }
}

const columnHelper = createColumnHelper<TaskItem>();
const columns = [
  columnHelper.accessor("isDone", { header: "taskManager.col1" }),
  columnHelper.accessor("title", { header: "taskManager.col2" }),
  columnHelper.accessor("category", { header: "taskManager.col3" }),
  columnHelper.accessor("date", { header: "taskManager.col4" }),
  columnHelper.display({ id: "delete", header: "taskManager.col5" }),
];

const table = useVueTable({
  get data() {
    return props.tasksList;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});
</script>

<style scoped>
.table-container {
  width: 100%;
  margin-top: 20px;
  overflow-x: auto;
}

.custom-table {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: var(--blackTheme-back-secondary);
  border-radius: 10px;
  overflow: hidden;
  color: white;
}

.custom-table thead {
  display: block;
  width: 100%;
}

.table-scroller {
  display: block;
  height: 400px;
  overflow-y: auto;
  width: 100%;
}

.custom-table tr {
  display: grid;
  grid-template-columns: 60px 2fr 1fr 120px 60px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.custom-table th,
.custom-table td {
  padding: 15px 20px;
  text-align: left;
  box-sizing: border-box;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.custom-table tr {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.custom-table th {
  background-color: rgba(0, 0, 0, 0.2);
  color: rgba(135, 137, 157, 0.8);
  font-size: 0.9rem;
}

.col-isDone,
.col-delete {
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  color: white;
}

span {
  color: white;
}

.date {
  color: rgba(255, 255, 255, 0.641);
}
img {
  width: 25px;
  height: 25px;
  cursor: pointer;
  display: block;
}

.line-through {
  text-decoration: line-through;
  filter: brightness(0.6);
}

.row-done {
  background-color: rgba(89, 162, 134, 0.1);
}

.table-cat {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.cat-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
}
</style>
