import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KAMU",
  authDomain: "PROJECT_KAMU.firebaseapp.com",
  projectId: "PROJECT_KAMU"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const list = document.getElementById("list");
const namaInput = document.getElementById("nama");
const saveBtn = document.getElementById("saveBtn");

let editId = null;

// LOAD DATA
async function loadData() {
  list.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "users"));

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${data.nama}</span>
      <div class="actions">
        <button class="edit">Edit</button>
        <button class="delete">Hapus</button>
      </div>
    `;

    // EDIT
    li.querySelector(".edit").onclick = () => {
      namaInput.value = data.nama;
      editId = docSnap.id;
      saveBtn.textContent = "Update";
    };

    // DELETE
    li.querySelector(".delete").onclick = async () => {
      await deleteDoc(doc(db, "users", docSnap.id));
      loadData();
    };

    list.appendChild(li);
  });
}

// TAMBAH / UPDATE
saveBtn.onclick = async () => {
  const nama = namaInput.value.trim();
  if (!nama) return alert("Nama tidak boleh kosong!");

  if (editId) {
    // UPDATE
    await updateDoc(doc(db, "users", editId), { nama });
    editId = null;
    saveBtn.textContent = "Tambah";
  } else {
    // TAMBAH
    await addDoc(collection(db, "users"), { nama });
  }

  namaInput.value = "";
  loadData();
};

// INIT
loadData();
