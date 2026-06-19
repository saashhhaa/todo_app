<script setup>
import { ref, watch } from "vue";
import { useUsersStore } from "../stores/store";

const usersStore = useUsersStore();
const newUsernameInput = ref("");
const previewImage = ref(""); 
const editMode = ref(false)

watch(editMode, (newValue) => {
  if (newValue) {
    newUsernameInput.value = usersStore.currentUser?.username || "";
    previewImage.value = usersStore.currentUser?.image || "/public/profileImageTest.jpg";
  }
});

function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    // Сохраняем строку картинки для отображения в круге
    previewImage.value = e.target.result;
  };
  reader.readAsDataURL(file);
}
const emit = defineEmits(["close"]);

function editUser (){

}
</script>

<template>
  <div class="settings">
    <div class="top">
      <img
        class="backButton"
        @click="emit('close')"
        src="/arrowIcon.svg"
        alt=""
      />
      <h1>Settings</h1>
    </div>

    <div class="account">
      <h3>Account</h3>
      <div class="cover">
        <div class="profileImage" v-if="!editMode">
          <img :src="usersStore.currentUser?.image || '/public/profileImageTest.jpg'" alt="Avatar" />
        </div>

        <label v-else class="profileImageUpload">
          <img :src="previewImage" alt="Preview" />
          <div class="uploadOverlay">edit</div>
          <input type="file" @change="handleFileChange" accept="image/*" class="hiddenFileInput">
        </label>
        <div>
          <div v-if="!editMode" class="username">{{ usersStore.currentUser?.username }}</div>
          <input type="text" v-else>
          <div class="email">{{ usersStore.currentUser?.email }}</div>
        </div>
      <button v-if="!editMode" @click="editMode=true" class="editButton">edit<img src="/penIcon.svg" alt="" /></button>
      <div v-else class="cover2">
         <button @click="editUser" class="editButton save" >∨</button>
        <button @click="editMode=false" class="editButton cancel">×</button>
      </div>
       
      </div>

    </div>
    <div class="todoSettings">
      <h3>Todo settings</h3>

    </div>
  </div>
</template>

<style scoped>
.cover2 {
  display: flex;
  justify-content: center;
  gap: 10px;
}
button.save,button.cancel  {
  filter: brightness(0.7);
  margin-left: 0;

}
button.save {
  border: 1px solid rgb(105, 232, 105);
  color: rgb(88, 206, 88)
}
button.cancel {
  border: 1px solid rgb(202, 94, 94) !important;
  color: rgb(187, 87, 87) !important
}


.account {
  margin-top: 5vh;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(135, 137, 157, 0.604);
  margin-bottom: 30px;
}

.username {
  font-weight: 700;
}

.cover {
  display: flex;
  gap: 20px;
}

.backButton {
  width: 30px;
  height: 30px;
  filter: brightness(0.6);
}

h3 {
  margin-bottom: 30px;
  color: rgba(135, 137, 157, 0.604);
}

img:hover {
  filter: brightness(1);
}

.email {
  filter: brightness(0.6);
}

.settings {
  width: 60vw;
  height: 60vh;
  background-color: var(--blackTheme-back);
  border-radius: 10px;
  padding: 4vh 5vw;
}

.top {
  display: flex;
  gap: 20px;
  align-items: center;
}

.editButton {
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 16px;
  border-radius: 50px;
  filter: brightness(0.5);
  height: fit-content;
  margin-left: 3vw;
}

.editButton img {
  width: 15px;
  height: 15px;
}

.editButton:hover {
  filter: brightness(1);
}

input[type='text']{
  flex: 2;
  outline: none;
  font-size: 16px;
  border: 1px solid transparent;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: var(--blackTheme-back-secondary);
  color: white;
}


.profileImage {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
}

.profileImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profileImageUpload {
  position: relative;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: block;
}

.profileImageUpload img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.2s ease;
}

.uploadOverlay {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.profileImageUpload:hover .uploadOverlay {
  opacity: 1;
  border: 50px;

}

.profileImageUpload:hover img {
  filter: blur(1px);
  border-radius: 50px;
}

.hiddenFileInput {
  display: none;
}
</style>
