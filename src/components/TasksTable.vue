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
                @click="
                  tasksStore.switchTaskState(
                    row.original.id,
                    row.original.createDate,
                  )
                "
                class="status-icon"
                :src="cell.getValue() ? doneIcon : activeIcon"
                alt="status"
              />
            </template>

            <template v-else-if="cell.column.id === 'title'">
              <span :class="{ 'line-through': row.original.isDone }">
                {{ cell.getValue() }}
              </span>

              <template
                v-if="
                  getLeftDays(
                    row.original.createDate,
                    row.original.deadlineDate,
                  ) !== null && !row.original.isDone
                "
              >
                <span
                  class="leftDays"
                  v-if="
                    getLeftDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )! > 0
                  "
                >
                  {{ $t("taskManager.daysLeft") }}
                  {{
                    getLeftDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )
                  }}
                </span>

                <span class="dead-text" v-let v-else>
                  {{ $t("taskManager.deadlinedDays") }}
                  {{
                    getAbsDeadlinedDays(
                      row.original.createDate,
                      row.original.deadlineDate,
                    )
                  }}
                  {{ $t("taskManager.days") }}
                </span>
              </template>
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

            <template v-else-if="cell.column.id === 'deadlineDate'">
              <span class="deadline">
                {{
                  cell.getValue()
                    ? formatTaskDate(cell.getValue() as string)
                    : "—"
                }}
              </span>
            </template>
            <template v-else-if="cell.column.id === 'createDate'">
              {{
                cell.getValue()
                  ? formatTaskDate(cell.getValue() as string)
                  : "—"
              }}
            </template>
            <template v-else-if="cell.column.id === 'doneDate'">
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

interface TaskItem {
  id: number;
  userId: number;
  title: string;
  createDate: string;
  doneDate: string;
  deadlineDate: string;
  deadlineDateNoFormat: string;
  category: string;
  catCol: string;
  isDone: boolean;
}
const props = defineProps<{
  tasksList: any[];
}>();

function getLeftDays(createDate: string, deadlineNoFormat: string) {
  if (!deadlineNoFormat || !createDate) return null;

  const start = dayjs(createDate);
  const end = dayjs(deadlineNoFormat);

  if (!start.isValid() || !end.isValid()) return null;

  return end.diff(start, "day");
}

const tasksStore = useTasksSStore();

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
  columnHelper.accessor("deadlineDate", { header: "taskManager.deadlineDate" }),
  columnHelper.accessor("createDate", { header: "taskManager.createDate" }),
  columnHelper.accessor("doneDate", { header: "taskManager.doneDate" }),
  columnHelper.display({ id: "delete", header: "taskManager.col5" }),
];

const table = useVueTable({
  get data() {
    return props.tasksList;
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
});

function getAbsDeadlinedDays(
  createDate: string,
  deadlineNoFormat: string,
): number {
  const days = getLeftDays(createDate, deadlineNoFormat);
  if (days === null) return 0;
  return Math.abs(days);
}
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
  max-height: 400px;
  overflow-y: auto;
  width: 100%;
}

.custom-table tr {
  display: grid;
  grid-template-columns: 60px 2fr 1.2fr 110px 110px 110px 60px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.custom-table th,
.custom-table td {
  /* border: 1px red solid; */
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
  background-color: rgba(0, 0, 0, 0.2);
}

.custom-table th {
  background-color: rgba(0, 0, 0, 0.2);
  height: 50px;
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

.leftDays {
  margin-left: 230px;
  color: rgba(255, 255, 255, 0.419);
  font-size: 12px;
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

.dead {
  background-color: rgba(255, 58, 58, 0.507);
  margin-left: 130px;

  color: rgb(96, 2, 2);
}

.line-through {
  text-decoration: line-through;
  filter: brightness(0.6);
}

.row-done {
  background-color: rgba(87, 115, 105, 0.427) !important;
  color: rgba(80, 181, 120, 0.529);
}

.row-done .deadline {
  color: inherit;
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

.dead-text {
  font-size: 12px;
  margin-left: 250px;
  color: rgb(255, 115, 115);
  font-weight: bold;
}

.row-deadlined .deadline {
  color: rgb(255, 140, 140);
}

</style>
