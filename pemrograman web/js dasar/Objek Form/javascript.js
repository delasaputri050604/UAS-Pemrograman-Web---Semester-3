// Menambahkan event listener untuk tombol hitung
hitungButton.addEventListener("click", function() { 
    // Mengambil nilai dari input panjang dan lebar
    var panjang = parseFloat(document.getElementById("panjang").value);
    var lebar = parseFloat(document.getElementById("lebar").value);

    // Menghitung luas dan keliling 
    var luas = panjang * lebar; 
    var keliling =2 * (panjang + lebar);

    // Menampilkan hasil di elemen hasil 
    hasilLuas.innerText = "Luas Persegi: " + luas +" satuan";
    hasilKeliling.innerText = "Keliling Persegi: " + keliling + " satuan";
 });