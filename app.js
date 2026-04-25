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
  apiKey: "AIzaSyAYV_1T_lXY2p0jm9OjUUEa_njGkMOgxNo",
  authDomain: "perpustakaan-mini-520b3.firebaseapp.com",
  projectId: "perpustakaan-mini-520b3",
  storageBucket: "perpustakaan-mini-520b3.firebasestorage.app",
  messagingSenderId: "970165492656",
  appId: "1:970165492656:web:66153994a892bd5c6d9475",
  measurementId: "G-2PFF7JX42F"
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
