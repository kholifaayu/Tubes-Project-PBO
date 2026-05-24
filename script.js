// LOGIN CHECK

if (localStorage.getItem("isLogin") !== "true") {
    window.location.href = "login.html";
}

// ABSTRACT CLASS

class Anggota {

    constructor(
        id,
        nis,
        nama,
        kelas,
        telepon,
        tahun
    ) {

        this.id = id;
        this.nis = nis;
        this.nama = nama;
        this.kelas = kelas;
        this.telepon = telepon;
        this.tahun = tahun;
    }

    getJenisAnggota() {
        throw new Error("Abstract Method");
    }

    hitungBonusKehadiran() {
        throw new Error("Abstract Method");
    }
}

// INHERITANCE

class AnggotaInti extends Anggota {

    getJenisAnggota() {
        return "Inti";
    }

    hitungBonusKehadiran() {
        return 100000;
    }
}

class AnggotaMagang extends Anggota {

    getJenisAnggota() {
        return "Magang";
    }

    hitungBonusKehadiran() {
        return 50000;
    }
}

// DATA

let daftarAnggota = [];
window.onload = function () {

    updateSelect();

};
let daftarRiwayat = [];
let daftarManajemenLatihan = [];

// PRESTASI
let daftarPrestasi = [];

// DISIPLIN
let daftarDisiplin = [];

// EDIT INDEX
let editIndex = -1;
let editLatihanIndex = -1;

// EDIT PRESTASI
let editPrestasiIndex = -1;

// EDIT DISIPLIN
let editDisiplinIndex = -1;

// ======================
// CRUD ANGGOTA
// ======================

function tambahAnggota() {
    updateSelect();
    const nis =
        document.getElementById("nis").value;

    const nama =
        document.getElementById("nama").value;

    const kelas =
        document.getElementById("kelas").value;

    const telepon =
        document.getElementById("telepon").value;

    const tahun =
        document.getElementById("tahun").value;

    const jenis =
        document.getElementById("jenis").value;

    if (
        nis === "" ||
        nama === "" ||
        kelas === "" ||
        telepon === "" ||
        tahun === ""
    ) {
        alert("Data belum lengkap!");
        return;
    }

    let anggota;

    if (jenis === "Inti") {

        anggota = new AnggotaInti(
            Date.now(),
            nis,
            nama,
            kelas,
            telepon,
            tahun
        );

    } else {

        anggota = new AnggotaMagang(
            Date.now(),
            nis,
            nama,
            kelas,
            telepon,
            tahun
        );
    }

    if (editIndex !== -1) {

        daftarAnggota[editIndex] = anggota;
        editIndex = -1;

    } else {

        daftarAnggota.push(anggota);
    }

    tampilkanAnggota();
    updateSelect();
    resetForm();
    updateLaporan();
}

function tampilkanAnggota() {

    const tbody =
        document.getElementById("dataAnggota");

    tbody.innerHTML = "";

    daftarAnggota.forEach((anggota, index) => {

        tbody.innerHTML += `
      <tr>

        <td>${anggota.nis}</td>
        <td>${anggota.nama}</td>
        <td>${anggota.kelas}</td>
        <td>${anggota.telepon}</td>
        <td>${anggota.tahun}</td>
        <td>${anggota.getJenisAnggota()}</td>

        <td>
          Rp ${anggota.hitungBonusKehadiran()}
        </td>

        <td>

          <button onclick="editAnggota(${index})">
            Edit
          </button>

          <button onclick="hapusAnggota(${index})">
            Hapus
          </button>

        </td>

      </tr>
    `;
    });

    document.getElementById(
        "totalAnggota"
    ).innerText = daftarAnggota.length;
}

function editAnggota(index) {

    const anggota = daftarAnggota[index];

    document.getElementById("nis").value =
        anggota.nis;

    document.getElementById("nama").value =
        anggota.nama;

    document.getElementById("kelas").value =
        anggota.kelas;

    document.getElementById("telepon").value =
        anggota.telepon;

    document.getElementById("tahun").value =
        anggota.tahun;

    document.getElementById("jenis").value =
        anggota.getJenisAnggota();

    editIndex = index;
}

function hapusAnggota(index) {

    if (confirm("Yakin hapus anggota?")) {

        daftarAnggota.splice(index, 1);

        tampilkanAnggota();
        updateSelect();
        updateLaporan();
    }
}

function resetForm() {

    document.getElementById("nis").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("kelas").value = "";
    document.getElementById("telepon").value = "";
    document.getElementById("tahun").value = "";
}

// ======================
// UPDATE SELECT
// ======================

function updateSelect() {


    // SELECT RIWAYAT
    const selectRiwayat =
        document.getElementById(
            "anggotaLatihan"
        );

    // SELECT MANAJEMEN
    const selectManajemen =
        document.getElementById(
            "anggotaManajemen"
        );

    // SELECT PRESTASI
    const selectPrestasi =
        document.getElementById(
            "anggotaPrestasi"
        );

    // SELECT DISIPLIN
    const selectDisiplin =
        document.getElementById(
            "anggotaDisiplin"
        );

    // RESET OPTION

    selectRiwayat.innerHTML =
        `<option value="">
    Pilih Anggota
  </option>`;

    selectManajemen.innerHTML =
        `<option value="">
    Pilih Anggota
  </option>`;

    selectPrestasi.innerHTML =
        `<option value="">
    Pilih Anggota
  </option>`;

    selectDisiplin.innerHTML =
        `<option value="">
    Pilih Anggota
  </option>`;

    // LOOP DATA ANGGOTA

    daftarAnggota.forEach((anggota) => {

        // OPTION
        const option = `
      <option value="${anggota.nama}">
        ${anggota.nama}
      </option>
    `;

        // MASUKKAN KE SEMUA SELECT

        selectRiwayat.innerHTML += option;

        selectManajemen.innerHTML += option;

        selectPrestasi.innerHTML += option;

        selectDisiplin.innerHTML += option;

    });

}

// ======================
// RIWAYAT LATIHAN
// ======================

function tambahRiwayat() {

    const nama =
        document.getElementById("anggotaLatihan").value;

    const tanggal =
        document.getElementById("tanggalLatihan").value;

    const status =
        document.getElementById("statusLatihan").value;

    if (nama === "" || tanggal === "") {
        alert("Data belum lengkap!");
        return;
    }

    daftarRiwayat.push({
        nama,
        tanggal,
        status
    });

    tampilkanRiwayat();
}

function tampilkanRiwayat() {

    const tbody =
        document.getElementById("dataRiwayat");

    tbody.innerHTML = "";

    daftarRiwayat.forEach((riwayat) => {

        tbody.innerHTML += `
      <tr>

        <td>${riwayat.nama}</td>

        <td>${riwayat.tanggal}</td>

        <td class="${riwayat.status === 'Hadir'
                ? 'status-hadir'
                : 'status-tidak'
            }">

          ${riwayat.status}

        </td>

      </tr>
    `;
    });

    document.getElementById(
        "totalRiwayat"
    ).innerText = daftarRiwayat.length;
}

// ======================
// MANAJEMEN LATIHAN
// ======================

function tambahManajemenLatihan() {

    const nama =
        document.getElementById(
            "anggotaManajemen"
        ).value;

    const tanggal =
        document.getElementById(
            "tanggalManajemen"
        ).value;

    const jam =
        document.getElementById(
            "jamLatihan"
        ).value;

    const tempat =
        document.getElementById(
            "tempatLatihan"
        ).value;

    const pelatih =
        document.getElementById(
            "pelatih"
        ).value;

    const materi =
        document.getElementById(
            "materi"
        ).value;

    const catatan =
        document.getElementById(
            "catatanLatihan"
        ).value;

    const status =
        document.getElementById(
            "statusManajemen"
        ).value;

    if (
        nama === "" ||
        tanggal === "" ||
        jam === "" ||
        tempat === "" ||
        pelatih === "" ||
        materi === ""
    ) {
        alert("Data latihan belum lengkap!");
        return;
    }

    const latihan = {
        nama,
        tanggal,
        jam,
        tempat,
        pelatih,
        materi,
        catatan,
        status
    };

    if (editLatihanIndex !== -1) {

        daftarManajemenLatihan[
            editLatihanIndex
        ] = latihan;

        editLatihanIndex = -1;

    } else {

        daftarManajemenLatihan.push(latihan);
    }

    tampilkanManajemenLatihan();

    resetFormLatihan();
    updateLaporan();

}

function tampilkanManajemenLatihan() {

    const tbody =
        document.getElementById(
            "dataManajemenLatihan"
        );

    tbody.innerHTML = "";

    daftarManajemenLatihan.forEach(
        (latihan, index) => {

            tbody.innerHTML += `
      <tr>

        <td>${latihan.nama}</td>
        <td>${latihan.tanggal}</td>
        <td>${latihan.jam}</td>
        <td>${latihan.tempat}</td>
        <td>${latihan.pelatih}</td>
        <td>${latihan.materi}</td>

        <td class="${latihan.status === 'Hadir'
                    ? 'status-hadir'
                    : latihan.status === 'Izin'
                        ? 'status-izin'
                        : 'status-tidak'
                }">

          ${latihan.status}

        </td>

        <td>

          <button
            onclick="editLatihan(${index})">

            Edit

          </button>

          <button
            onclick="hapusLatihan(${index})">

            Hapus

          </button>

        </td>

      </tr>
    `;
        });

    document.getElementById(
        "totalLatihan"
    ).innerText =
        daftarManajemenLatihan.length;
}

function editLatihan(index) {

    const latihan =
        daftarManajemenLatihan[index];

    document.getElementById(
        "anggotaManajemen"
    ).value = latihan.nama;

    document.getElementById(
        "tanggalManajemen"
    ).value = latihan.tanggal;

    document.getElementById(
        "jamLatihan"
    ).value = latihan.jam;

    document.getElementById(
        "tempatLatihan"
    ).value = latihan.tempat;

    document.getElementById(
        "pelatih"
    ).value = latihan.pelatih;

    document.getElementById(
        "materi"
    ).value = latihan.materi;

    document.getElementById(
        "catatanLatihan"
    ).value = latihan.catatan;

    document.getElementById(
        "statusManajemen"
    ).value = latihan.status;

    editLatihanIndex = index;
}

function hapusLatihan(index) {

    if (confirm("Yakin hapus latihan?")) {

        daftarManajemenLatihan.splice(
            index,
            1
        );

        tampilkanManajemenLatihan();
        updateLaporan();
    }
}

function resetFormLatihan() {

    document.getElementById(
        "anggotaManajemen"
    ).value = "";

    document.getElementById(
        "tanggalManajemen"
    ).value = "";

    document.getElementById(
        "jamLatihan"
    ).value = "";

    document.getElementById(
        "tempatLatihan"
    ).value = "";

    document.getElementById(
        "pelatih"
    ).value = "";

    document.getElementById(
        "materi"
    ).value = "";

    document.getElementById(
        "catatanLatihan"
    ).value = "";

    document.getElementById(
        "statusManajemen"
    ).value = "Hadir";
}

// ======================
// UPDATE LAPORAN
// ======================

function updateLaporan() {

    document.getElementById(
        "laporanAnggota"
    ).innerText =
        daftarAnggota.length;

    document.getElementById(
        "laporanLatihan"
    ).innerText =
        daftarManajemenLatihan.length;

    document.getElementById(
        "laporanPrestasi"
    ).innerText =
        daftarPrestasi.length;

    document.getElementById(
        "laporanDisiplin"
    ).innerText =
        daftarDisiplin.length;
}

// ======================
// LOGOUT
// ======================

function logout() {

    localStorage.removeItem("isLogin");

    window.location.href =
        "login.html";
}

// ==============================
// PRESTASI
// ==============================

function tambahPrestasi() {

    const nama =
        document.getElementById(
            "anggotaPrestasi"
        ).value;

    const prestasi =
        document.getElementById(
            "namaPrestasi"
        ).value;

    const tingkat =
        document.getElementById(
            "tingkatPrestasi"
        ).value;

    const tahun =
        document.getElementById(
            "tahunPrestasi"
        ).value;

    const keterangan =
        document.getElementById(
            "keteranganPrestasi"
        ).value;

    if (
        nama === "" ||
        prestasi === "" ||
        tahun === ""
    ) {

        alert("Data prestasi belum lengkap!");

        return;
    }

    const dataPrestasi = {
        nama,
        prestasi,
        tingkat,
        tahun,
        keterangan
    };

    if (editPrestasiIndex !== -1) {

        daftarPrestasi[
            editPrestasiIndex
        ] = dataPrestasi;

        editPrestasiIndex = -1;

    } else {

        daftarPrestasi.push(
            dataPrestasi
        );
    }

    tampilkanPrestasi();

    resetPrestasi();
    updateLaporan();
}

function tampilkanPrestasi() {

    const tbody =
        document.getElementById(
            "dataPrestasi"
        );

    tbody.innerHTML = "";

    daftarPrestasi.forEach(
        (prestasi, index) => {

            tbody.innerHTML += `
            <tr>

                <td>${prestasi.nama}</td>

                <td>${prestasi.prestasi}</td>

                <td>${prestasi.tingkat}</td>

                <td>${prestasi.tahun}</td>

                <td>${prestasi.keterangan}</td>

                <td>

                    <button onclick="editPrestasi(${index})">
                        Edit
                    </button>

                    <button onclick="hapusPrestasi(${index})">
                        Hapus
                    </button>

                </td>

            </tr>
            `;
        });

    const total =
        document.getElementById(
            "totalPrestasi"
        );

    if (total) {

        total.innerText =
            daftarPrestasi.length;
    }
}

function editPrestasi(index) {

    const prestasi =
        daftarPrestasi[index];

    document.getElementById(
        "anggotaPrestasi"
    ).value = prestasi.nama;

    document.getElementById(
        "namaPrestasi"
    ).value = prestasi.prestasi;

    document.getElementById(
        "tingkatPrestasi"
    ).value = prestasi.tingkat;

    document.getElementById(
        "tahunPrestasi"
    ).value = prestasi.tahun;

    document.getElementById(
        "keteranganPrestasi"
    ).value = prestasi.keterangan;

    editPrestasiIndex = index;
}

function hapusPrestasi(index) {

    if (confirm("Yakin hapus prestasi?")) {

        daftarPrestasi.splice(
            index,
            1
        );

        tampilkanPrestasi();
        updateLaporan();
    }
}

function resetPrestasi() {

    document.getElementById(
        "anggotaPrestasi"
    ).value = "";

    document.getElementById(
        "namaPrestasi"
    ).value = "";

    document.getElementById(
        "tahunPrestasi"
    ).value = "";

    document.getElementById(
        "keteranganPrestasi"
    ).value = "";
}

// ==============================
// DISIPLIN
// ==============================

function tambahDisiplin() {

    const nama =
        document.getElementById(
            "anggotaDisiplin"
        ).value;

    const pelanggaran =
        document.getElementById(
            "pelanggaran"
        ).value;

    const poin =
        document.getElementById(
            "poinPelanggaran"
        ).value;

    const catatan =
        document.getElementById(
            "catatanDisiplin"
        ).value;

    if (
        nama === "" ||
        pelanggaran === "" ||
        poin === ""
    ) {

        alert("Data disiplin belum lengkap!");

        return;
    }

    const disiplin = {
        nama,
        pelanggaran,
        poin,
        catatan
    };

    if (editDisiplinIndex !== -1) {

        daftarDisiplin[
            editDisiplinIndex
        ] = disiplin;

        editDisiplinIndex = -1;

    } else {

        daftarDisiplin.push(
            disiplin
        );
    }

    tampilkanDisiplin();

    resetDisiplin();
    updateLaporan();
}

function tampilkanDisiplin() {

    const tbody =
        document.getElementById(
            "dataDisiplin"
        );

    tbody.innerHTML = "";

    daftarDisiplin.forEach(
        (disiplin, index) => {

            tbody.innerHTML += `
            <tr>

                <td>${disiplin.nama}</td>

                <td>${disiplin.pelanggaran}</td>

                <td>${disiplin.poin}</td>

                <td>${disiplin.catatan}</td>

                <td>

                    <button onclick="editDisiplin(${index})">
                        Edit
                    </button>

                    <button onclick="hapusDisiplin(${index})">
                        Hapus
                    </button>

                </td>

            </tr>
            `;
        });

    const total =
        document.getElementById(
            "totalDisiplin"
        );

    if (total) {

        total.innerText =
            daftarDisiplin.length;
    }
}

function editDisiplin(index) {

    const disiplin =
        daftarDisiplin[index];

    document.getElementById(
        "anggotaDisiplin"
    ).value = disiplin.nama;

    document.getElementById(
        "pelanggaran"
    ).value = disiplin.pelanggaran;

    document.getElementById(
        "poinPelanggaran"
    ).value = disiplin.poin;

    document.getElementById(
        "catatanDisiplin"
    ).value = disiplin.catatan;

    editDisiplinIndex = index;
}

function hapusDisiplin(index) {

    if (confirm("Yakin hapus disiplin?")) {

        daftarDisiplin.splice(
            index,
            1
        );

        tampilkanDisiplin();
        updateLaporan();
    }
}

function resetDisiplin() {

    document.getElementById(
        "anggotaDisiplin"
    ).value = "";

    document.getElementById(
        "pelanggaran"
    ).value = "";

    document.getElementById(
        "poinPelanggaran"
    ).value = "";

    document.getElementById(
        "catatanDisiplin"
    ).value = "";
}

function logout() {

    localStorage.removeItem("isLogin");

    window.location.href = "login.html";
}

