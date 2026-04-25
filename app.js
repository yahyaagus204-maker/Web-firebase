import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "API_KAMU",
  authDomain: "PROJECT_KAMU.firebaseapp.com",
  projectId: "PROJECT_KAMU"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadData() {
  const list = document.getElementById("list");

  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const li = document.createElement("li");
      li.textContent = "👤 " + doc.data().nama;
      list.appendChild(li);
    });

  } catch (err) {
    list.innerHTML = "<li style='color:red;'>Gagal load data</li>";
    console.error(err);
  }
}

loadData();
