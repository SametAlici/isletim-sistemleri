// Haftalık özetler. exam: "vize" (1–5) ya da "final" (6–9). h2 başlıklarındaki id'ler çözümlerdeki "Konuya git" bağlantılarının hedefidir.
const WEEKS = [
{
  id: 1, exam: "vize",
  title: "Giriş",
  short: "İşletim sisteminin görevi, kesmeler, depolama hiyerarşisi, çok işlemcili sistemler, çoklu programlama ve çoklu görev, çift mod.",
  principle: "İşletim sistemi, donanım ile kullanıcı arasında kaynakları paylaştıran ve programları denetleyen yazılımdır.",
  body: `
<h2 id="tanim">1. İşletim sistemi nedir?</h2>
<p>Bilgisayar sistemi dört bileşenden oluşur: <b>donanım</b> (CPU, bellek, G/Ç) · <b>işletim sistemi</b> · <b>uygulama programları</b> · <b>kullanıcılar</b>. İşletim sistemi iki bakış açısıyla tanımlanır:</p>
<ul>
<li><b>Kaynak tahsis edici (resource allocator):</b> CPU zamanı, bellek, dosya ve G/Ç aygıtlarını çakışan istekler arasında adil ve verimli paylaştırır.</li>
<li><b>Kontrol programı:</b> programların çalışmasını denetler, hataları ve yanlış kullanımı önler.</li>
</ul>
<p>Her zaman çalışan çekirdek bölüme <b>kernel (çekirdek)</b> denir. Geri kalanlar sistem programları ve uygulamalardır.</p>

<h2 id="kesme">2. Kesmeler (interrupt)</h2>
<div class="box key">Aygıt denetleyicisi işini bitirince CPU'ya <b>kesme</b> gönderir. CPU o anki işini bırakır, <b>kesme vektörü</b> aracılığıyla ilgili <b>kesme servis rutinine (ISR)</b> atlar, sonra kaldığı yere döner. Kesmeler sistem olaylarının sıraya alınıp işlenmesini sağlar; işletim sistemi <b>kesme güdümlüdür</b> (interrupt-driven).</div>
<ul>
<li><b>Donanım kesmesi:</b> aygıtlardan gelir (klavye, disk tamamlandı).</li>
<li><b>Yazılım kesmesi / tuzak (trap, exception):</b> hata (sıfıra bölme) ya da sistem çağrısı.</li>
<li>Kesme sırasında dönüş adresi ve CPU durumu saklanır; işi bitince geri yüklenir.</li>
</ul>

<h2 id="depolama">3. Depolama hiyerarşisi</h2>
<p>Yukarıdan aşağı: hız ve maliyet azalır, kapasite artar.</p>
<div class="formula">register  →  cache  →  ana bellek (RAM)  →  SSD / HDD  →  optik disk  →  manyetik bant
(en hızlı, en küçük)                                              (en yavaş, en büyük)</div>
<p>Erişim süresine göre küçükten büyüğe: <b>register &lt; cache &lt; memory &lt; hdd &lt; optik disk &lt; manyetik bant</b>. RAM <b>uçucudur</b> (volatile); disk ve bantlar kalıcıdır. <b>Önbellekleme (caching):</b> sık kullanılan veri daha hızlı katmana kopyalanır.</p>
<p><b>DMA (Doğrudan Bellek Erişimi):</b> büyük veri bloklarını CPU'yu meşgul etmeden aygıttan belleğe aktarır; blok başına bir kesme üretilir.</p>

<h2 id="mimari">4. Bilgisayar sistemi mimarileri</h2>
<div class="table-wrap"><table>
<tr><th>Mimari</th><th>Özellik</th></tr>
<tr><td>Tek işlemcili</td><td>Tek genel amaçlı CPU</td></tr>
<tr><td>Çok işlemcili (paralel, sıkı bağlı)</td><td>Bellek ve saati paylaşan birden çok CPU. <b>SMP</b> (simetrik): her işlemci her işi yapar</td></tr>
<tr><td>Çok çekirdekli (multicore)</td><td>Birden çok çekirdek tek yonga üzerinde; çekirdekler arası iletişim hızlı, güç tüketimi düşük</td></tr>
<tr><td>Kümelenmiş (clustered)</td><td>Ağla bağlı ayrı sistemler; yüksek erişilebilirlik (high availability)</td></tr>
</table></div>
<div class="box tip"><span class="label">Çok işlemcili / çok çekirdekli sistemlerin avantajları</span>1) <b>Verim (throughput) artışı</b> 2) <b>Ölçek ekonomisi / ölçeklenebilirlik</b> (çevre birimler, bellek paylaşılır) 3) <b>Güvenilirlik</b> (bir işlemci arızalansa sistem yavaşlar ama durmaz — zarif bozulma).</div>

<h2 id="coklu">5. Çoklu programlama ve çoklu görev</h2>
<ul>
<li><b>Çoklu programlama (multiprogramming):</b> bellekte birden çok iş tutulur; biri G/Ç beklerken CPU başka işe geçer → CPU boş kalmaz.</li>
<li><b>Çoklu görev / zaman paylaşımı (multitasking, time-sharing):</b> CPU işler arasında çok sık geçiş yapar; her göreve sırayla zaman dilimi verir. Kullanıcı etkileşimli çalışır, <b>yanıt süresi</b> kısadır.</li>
</ul>
<div class="box warn"><span class="label">Sık sorulan tuzak</span>Tek CPU'da çoklu görev <b>gerçek paralellik sağlamaz</b>; görevler hızla değiştirildiği için aynı anda çalışıyormuş gibi görünür (eşzamanlılık / concurrency). Gerçek paralellik birden çok çekirdek ister.</div>

<h2 id="mod">6. Çift mod ve zamanlayıcı</h2>
<p><b>Kullanıcı modu</b> ve <b>çekirdek (kernel) modu</b> donanımdaki <b>mod biti</b> ile ayrılır. <b>Ayrıcalıklı (privileged) komutlar</b> yalnızca çekirdek modunda çalışır. Sistem çağrısı → mod çekirdeğe geçer, dönüşte kullanıcıya döner.</p>
<p><b>Zamanlayıcı (timer):</b> bir prosesin CPU'yu sonsuza dek tutmasını engellemek için belirli aralıkla kesme üretir.</p>

<h2 id="yonetim">7. İşletim sisteminin yönetim görevleri</h2>
<p>Proses yönetimi · bellek yönetimi · dosya sistemi yönetimi · yığın depolama yönetimi · önbellek yönetimi · G/Ç alt sistemi · koruma ve güvenlik. Ayrıca sanallaştırma, dağıtık sistemler ve gömülü/gerçek zamanlı sistemler gibi hesaplama ortamları vardır.</p>
`
},
{
  id: 2, exam: "vize",
  title: "İşletim Sistemi Yapıları",
  short: "İS servisleri, kullanıcı arayüzleri, sistem çağrıları ve türleri, derleme–bağlama–yükleme, yapı türleri, önyükleme.",
  principle: "Programlar işletim sistemi servislerine sistem çağrılarıyla ulaşır; tasarımda politika ile mekanizma ayrılır.",
  body: `
<h2 id="servis">1. İşletim sistemi servisleri</h2>
<p><b>Kullanıcıya yararlı:</b> kullanıcı arayüzü · program çalıştırma · G/Ç işlemleri · dosya sistemi işlemleri · iletişim (paylaşımlı bellek / mesaj geçişi) · hata tespiti.</p>
<p><b>Sistemin verimli çalışması için:</b> kaynak tahsisi · kayıt tutma (logging / accounting) · koruma ve güvenlik.</p>
<p><b>Kullanıcı arayüzleri:</b> komut satırı (CLI, kabuk/shell) · grafik arayüz (GUI) · dokunmatik arayüz · toplu iş (batch).</p>

<h2 id="cagri">2. Sistem çağrıları</h2>
<div class="box key">Sistem çağrısı, çalışan programın işletim sistemi servislerine eriştiği <b>arayüzdür</b>. Programlar genellikle doğrudan çağrı yapmaz; <b>API</b> (Win32, POSIX, Java API) kullanır, API sistem çağrısını tetikler.</div>
<p>Parametre geçirme yolları: 1) <b>register</b>'larda 2) bellekte bir <b>blok/tablo</b> adresini register'a yazarak 3) <b>yığına (stack)</b> itme.</p>
<div class="table-wrap"><table>
<tr><th>Tür</th><th>Örnek (UNIX)</th></tr>
<tr><td>Proses kontrolü</td><td>fork(), exit(), wait()</td></tr>
<tr><td>Dosya yönetimi</td><td>open(), read(), write(), close()</td></tr>
<tr><td>Aygıt yönetimi</td><td>ioctl(), read(), write()</td></tr>
<tr><td>Bilgi bakımı</td><td>getpid(), alarm(), sleep()</td></tr>
<tr><td>İletişim</td><td>pipe(), shm_open(), mmap()</td></tr>
<tr><td>Koruma</td><td>chmod(), umask(), chown()</td></tr>
</table></div>

<h2 id="derleme">3. Programdan çalıştırmaya</h2>
<div class="formula">Kaynak kod  --(Derle / compiler)-->  nesne dosyası
            --(Bağla / linker)-->  çalıştırılabilir dosya
            --(Yükle / loader)-->  bellekte program  -->  Çalıştır</div>
<p>Sıra: <b>Derle → Bağla → Yükle → Çalıştır</b>. Dinamik bağlantılı kütüphaneler (DLL / .so) çalışma anında yüklenir.</p>

<h2 id="yapi">4. İşletim sistemi yapıları</h2>
<p><b>Politika ve mekanizma ayrımı:</b> mekanizma <i>nasıl</i> yapılacağını, politika <i>ne</i> yapılacağını belirler.</p>
<div class="table-wrap"><table>
<tr><th>Yapı</th><th>Özellik</th></tr>
<tr><td>Monolitik (tek parça)</td><td>Tüm çekirdek tek adres alanında; hızlı ama bakımı zor (geleneksel UNIX, Linux)</td></tr>
<tr><td>Katmanlı</td><td>Her katman yalnızca altındakini kullanır; hata ayıklaması kolay, performansı düşük</td></tr>
<tr><td>Mikroçekirdek</td><td>Çekirdekte yalnızca temel işlevler; servisler kullanıcı alanında, mesaj geçişiyle haberleşir. Güvenilir ve genişletilebilir ama mesaj yükü var (Mach)</td></tr>
<tr><td>Modüler</td><td>Yüklenebilir çekirdek modülleri (LKM); Linux, Solaris</td></tr>
<tr><td>Hibrit</td><td>Birkaç yaklaşımın karışımı (Windows, macOS)</td></tr>
</table></div>

<h2 id="boot">5. Önyükleme (boot)</h2>
<p>Güç verilince donanım, kalıcı bellekteki <b>önyükleyiciyi</b> (BIOS/UEFI içindeki bootstrap) çalıştırır; o da çekirdeği belleğe yükleyip başlatır. GRUB gibi önyükleyiciler hangi çekirdeğin yükleneceğini seçtirir.</p>
`
},
{
  id: 3, exam: "vize",
  title: "Prosesler",
  short: "Proses, bellek yerleşimi, proses durumları, PCB, bağlam değişimi, çizelgeleyiciler, fork(), IPC (paylaşımlı bellek, mesaj, pipe, soket).",
  principle: "Proses çalışan programdır; işletim sistemi her prosesi PCB ile izler ve durumlar arasında taşır.",
  body: `
<h2 id="proses">1. Proses kavramı</h2>
<p><b>Proses:</b> çalışmakta olan program. Program pasif (diskte dosya), proses aktiftir. Bellekteki bölümleri:</p>
<div class="formula">yüksek adres  ┌────────────┐
              │   stack    │  ← fonksiyon parametreleri, yerel değişkenler, dönüş adresi
              │     ↓      │
              │     ↑      │
              │   heap     │  ← çalışma anında dinamik bellek
              │   data     │  ← global değişkenler
düşük adres   │   text     │  ← program kodu
              └────────────┘</div>

<h2 id="durum">2. Proses durumları</h2>
<div class="formula">new ──kabul──► ready ◄──kesme (interrupt)── running ──exit──► terminated
                 │  ▲                        ▲  │
                 │  └── G/Ç veya olay ───────┘  │
                 │      tamamlandı (waiting→ready)│
                 └──── çizelgeleyici seçti ──────┘   running ──G/Ç veya olay bekle──► waiting</div>
<div class="table-wrap"><table>
<tr><th>Geçiş</th><th>Ne zaman</th></tr>
<tr><td>Ready → Running</td><td>Çizelgeleyici prosesi seçti (dispatch)</td></tr>
<tr><td>Running → Ready</td><td>Kesme geldi / zaman dilimi bitti</td></tr>
<tr><td>Running → Waiting (Blocked)</td><td>G/Ç gerektiğinde, diske yazma/okuma, bir olayı bekleme, bellekten veri getirilirken (sayfa hatası)</td></tr>
<tr><td>Waiting → Ready</td><td>G/Ç ya da olay tamamlandı</td></tr>
<tr><td>Running → Terminated</td><td>Proses sonlandı</td></tr>
</table></div>
<div class="box warn"><span class="label">Mümkün olmayan geçişler</span>Ready, Running ve Blocked olmak üzere üç durumlu modelde <b>Ready → Blocked</b> (çalışmayan proses G/Ç isteyemez) ve <b>Blocked → Running</b> (önce Ready'e geçmesi gerekir) mümkün değildir.</div>

<h2 id="pcb">3. Proses Kontrol Bloğu (PCB)</h2>
<p>Her prosesin bilgilerini tutan yapı: <b>proses durumu</b> · <b>program sayacı (PC)</b> · <b>CPU register'ları</b> (yığın göstergesi dâhil) · <b>CPU çizelgeleme bilgisi</b> (öncelik, kuyruk göstergeleri) · <b>bellek yönetim bilgisi</b> · <b>hesap bilgisi</b> · <b>G/Ç durum bilgisi</b> (açık dosya tanımlayıcıları). İşletim sisteminin adı gibi genel bilgiler PCB'de <b>yoktur</b>.</p>

<h2 id="baglam">4. Bağlam değişimi ve çizelgeleyiciler</h2>
<p><b>Bağlam değişimi (context switch):</b> CPU başka prosese geçerken eski prosesin durumu PCB'ye kaydedilir, yenisininki yüklenir. Bu süre <b>ek yüktür</b>, faydalı iş yapılmaz.</p>
<p><b>Kuyruklar:</b> iş kuyruğu, hazır kuyruğu (ready queue), aygıt/bekleme kuyrukları.</p>
<div class="table-wrap"><table>
<tr><th>Çizelgeleyici</th><th>Görevi</th></tr>
<tr><td>Uzun dönem (iş)</td><td>Hangi prosesin hazır kuyruğuna alınacağını seçer; çoklu programlama derecesini kontrol eder</td></tr>
<tr><td>Kısa dönem (CPU)</td><td>Hazır kuyruğundan CPU'ya prosesi seçer; çok sık çalışır</td></tr>
<tr><td>Orta dönem</td><td>Prosesleri bellekten diske takas eder (swapping)</td></tr>
</table></div>
<p>Prosesler <b>G/Ç ağırlıklı</b> (kısa CPU patlamaları) ya da <b>CPU ağırlıklı</b> (uzun patlamalar) olabilir.</p>

<h2 id="fork">5. Proses oluşturma: fork()</h2>
<div class="box key"><code>fork()</code> çağrısı çağıran prosesin kopyası olan bir <b>çocuk proses</b> oluşturur. Dönüş değeri: <b>çocukta 0</b>, <b>ebeveynde çocuğun PID'i</b> (pozitif), hata durumunda −1. Çocuk, ebeveynin bellek alanının <b>ayrı bir kopyasına</b> sahiptir; birinin değişkeni değiştirmesi diğerini etkilemez.</div>
<details class="example" open><summary>Örnek: fork() sonrası değişkenler</summary><div class="inner">
<div class="formula">int x = 10;
pid = fork();
if (pid == 0) { x = 20; printf("p1: x = %d\\n", x); }   // çocuk
else          { printf("p2: x = %d\\n", x); }          // ebeveyn</div>
<p>Çıktı: <b>p1: x = 20</b> ve <b>p2: x = 10</b> (sıra çizelgelemeye bağlıdır). Çocuktaki atama ebeveynin x'ini değiştirmez.</p>
<p>n kez art arda <code>fork()</code> çağrılırsa toplam <b>2ⁿ</b> proses olur (2ⁿ − 1 yeni proses).</p>
</div></details>
<p><code>exec()</code> prosesin bellek alanını yeni programla değiştirir. <code>wait()</code> ebeveynin çocuğun bitmesini beklemesini sağlar. Ebeveyni bitmiş çocuk <b>yetim (orphan)</b>, ebeveyni wait yapmamış bitmiş çocuk <b>zombi</b> olur.</p>

<h2 id="ipc">6. Prosesler arası iletişim (IPC)</h2>
<p>İşbirliği yapan proseslerin sebepleri: <b>bilgi paylaşımı</b>, <b>hızlı hesaplama</b>, <b>modülerlik</b>, kolaylık.</p>
<div class="table-wrap"><table>
<tr><th>Model</th><th>Özellik</th></tr>
<tr><td>Paylaşımlı bellek</td><td>Ortak bellek bölgesi; hızlı, senkronizasyon proseslerin sorumluluğunda (üretici–tüketici)</td></tr>
<tr><td>Mesaj geçişi</td><td>send() / receive(); doğrudan ya da dolaylı (posta kutusu) iletişim; bloklayan (senkron) veya bloklamayan (asenkron)</td></tr>
<tr><td>Sıradan tüneller (pipe)</td><td>Tek yönlü, ebeveyn–çocuk arası</td></tr>
<tr><td>İsimli tüneller (FIFO)</td><td>Çift yönlü olabilir, ebeveyn–çocuk ilişkisi gerekmez</td></tr>
<tr><td>Soketler</td><td>IP adresi + port; ağ üzerinden iletişim</td></tr>
<tr><td>RPC</td><td>Uzak yordam çağrısı</td></tr>
</table></div>
`
},
{
  id: 4, exam: "vize",
  title: "İş Parçacıkları (Thread)",
  short: "Thread kavramı, faydaları, çok çekirdekli programlama, Amdahl yasası, çoklu iş parçacığı modelleri, Pthreads, Java, örtülü thread, yarış durumu.",
  principle: "Thread, aynı prosesin kodunu, verisini ve dosyalarını paylaşan ama kendi yığını ve register'ları olan çalışma birimidir.",
  body: `
<h2 id="thread">1. Thread nedir?</h2>
<p>CPU kullanımının temel birimi. Her thread'in kendi <b>thread kimliği, program sayacı, register kümesi ve yığını</b> vardır; aynı prosesteki thread'ler <b>kod, veri ve açık dosyaları paylaşır</b>.</p>
<p><b>Faydaları:</b> yanıt verebilirlik (bir kısım bloklansa da program çalışır) · kaynak paylaşımı · ekonomi (proses oluşturmaktan ucuz) · ölçeklenebilirlik (çok çekirdekten yararlanma).</p>

<h2 id="paralel">2. Eşzamanlılık ve paralellik</h2>
<ul>
<li><b>Eşzamanlılık (concurrency):</b> birden çok görev ilerleme kaydeder (tek çekirdekte iç içe geçerek).</li>
<li><b>Paralellik (parallelism):</b> birden çok görev <b>aynı anda</b> çalışır (çok çekirdek).</li>
<li><b>Veri paralelliği:</b> aynı işlem verinin farklı parçalarında · <b>Görev paralelliği:</b> farklı işlemler farklı çekirdeklerde.</li>
</ul>
<p>Çok çekirdekli programlamanın zorlukları: görevleri bölme · denge · veri bölme · veri bağımlılığı · test ve hata ayıklama.</p>

<h2 id="amdahl">3. Amdahl yasası</h2>
<div class="formula">hızlanma ≤ 1 / ( S + (1 − S) / N )
S: seri (paralelleşemeyen) oran,  N: çekirdek sayısı</div>
<details class="example" open><summary>Örnek: %60 paralel, 2 kat hız için kaç çekirdek?</summary><div class="inner">
<p>S = 0,4 ve 1 / (0,4 + 0,6/N) = 2 → 0,4 + 0,6/N = 0,5 → 0,6/N = 0,1 → <b>N = 6</b>.</p>
<p>N → ∞ iken hızlanma 1/S'ye yaklaşır: S = 0,4 ise en fazla 2,5 kat.</p>
</div></details>

<h2 id="model">4. Kullanıcı ve çekirdek thread'leri, modeller</h2>
<div class="table-wrap"><table>
<tr><th>Model</th><th>Özellik</th></tr>
<tr><td>Çok-a-bir (many-to-one)</td><td>Birçok kullanıcı thread'i tek çekirdek thread'ine; biri bloklanınca hepsi bloklanır, paralellik yok</td></tr>
<tr><td>Bire-bir (one-to-one)</td><td>Her kullanıcı thread'ine bir çekirdek thread'i; paralellik var, çok thread çekirdeğe yük (Windows, Linux)</td></tr>
<tr><td>Çok-a-çok (many-to-many)</td><td>Birçok kullanıcı thread'i, eşit ya da daha az çekirdek thread'ine</td></tr>
<tr><td>İki seviyeli</td><td>Çok-a-çok + bir kullanıcı thread'i bir çekirdek thread'ine bağlanabilir</td></tr>
</table></div>

<h2 id="pthread">5. Thread kütüphaneleri</h2>
<div class="formula">Pthreads (POSIX):  pthread_create(&tid, NULL, fonk, arg);   pthread_join(tid, NULL);
Java:              Thread t = new MyThread();  t.start();   // run() doğrudan çağrılmaz
                   t.join() → bitmesini bekle,  Thread.sleep() → beklet</div>
<div class="box warn"><span class="label">Yarış durumu (race condition)</span>İki thread paylaşılan <code>x</code>'i senkronizasyonsuz 1.000.000'ar kez artırırsa <code>x++</code> atomik olmadığı (oku–artır–yaz) için güncellemeler kaybolur; sonuç <b>2.000.000'dan küçük, rastgele</b> bir değer olur. Çözüm: mutex/semafor (Hafta 6).</div>

<h2 id="ortulu">6. Örtülü (implicit) thread oluşturma</h2>
<p>Thread'leri programcı yerine derleyici/kütüphane yönetir: <b>thread havuzları</b> · <b>fork-join paralelliği</b> · <b>OpenMP</b> · <b>Grand Central Dispatch (GCD)</b> · Intel TBB. <b>Thread-local storage (TLS)</b> bir örtülü oluşturma yöntemi <b>değildir</b>; her thread'e özel veri tutma mekanizmasıdır.</p>

<h2 id="sorunlar">7. Thread sorunları</h2>
<ul>
<li>Çok thread'li proseste <code>fork()</code> tüm thread'leri mi kopyalar? <code>exec()</code> tüm prosesi değiştirir.</li>
<li><b>Sinyal işleme:</b> sinyal hangi thread'e iletilecek?</li>
<li><b>Thread iptali:</b> asenkron (hemen) ya da ertelenmiş (deferred, iptal noktasında).</li>
<li><b>Çizelgeleyici aktivasyonları:</b> çekirdek ile thread kütüphanesi arası iletişim (LWP, upcall).</li>
</ul>
`
},
{
  id: 5, exam: "vize",
  title: "İş Sıralama (CPU Çizelgeleme)",
  short: "Kriterler, FCFS, SJF/SRTF, öncelik, RR, çok seviyeli kuyruk ve geri beslemeli kuyruk, üstel ortalama, Gantt hesapları.",
  principle: "Çizelgeleme algoritması bekleme süresini, yanıt süresini ve verimi dengeler; sınavda Gantt şeması çizmek esastır.",
  body: `
<h2 id="kavram">1. Temel kavramlar</h2>
<p>Proses yürütmesi <b>CPU patlaması</b> ve <b>G/Ç patlaması</b> döngüsüdür. <b>Kesmeli (preemptive)</b> çizelgelemede çalışan proses CPU'dan alınabilir; <b>kesmesiz (non-preemptive)</b> çizelgelemede proses bitene ya da bloklanana kadar CPU'yu tutar. <b>Dispatcher</b> CPU'yu seçilen prosese verir; bunun süresi <b>dispatch gecikmesidir</b>.</p>

<h2 id="kriter">2. Çizelgeleme kriterleri</h2>
<div class="table-wrap"><table>
<tr><th>Kriter</th><th>Tanım</th><th>Hedef</th></tr>
<tr><td>CPU kullanımı</td><td>CPU'nun meşgul olduğu oran</td><td>Büyük</td></tr>
<tr><td>Verim (throughput)</td><td>Birim zamanda biten proses sayısı</td><td>Büyük</td></tr>
<tr><td>Tamamlanma (turnaround)</td><td>Bitiş − varış</td><td>Küçük</td></tr>
<tr><td>Bekleme (waiting)</td><td>Hazır kuyruğunda geçen süre = tamamlanma − CPU süresi</td><td>Küçük</td></tr>
<tr><td>Yanıt (response)</td><td>İlk CPU'ya çıkış − varış</td><td>Küçük</td></tr>
</table></div>

<h2 id="fcfs">3. FCFS (İlk gelen ilk çalışır)</h2>
<p>Varış sırasına göre, kesmesiz. Basit ama uzun bir proses öndeyse kısa prosesler arkasında bekler: <b>konvoy etkisi</b>.</p>
<details class="example" open><summary>Örnek: P1=24, P2=3, P3=3 (hepsi 0'da)</summary><div class="inner">
<div class="formula">| P1 0–24 | P2 24–27 | P3 27–30 |   bekleme: 0, 24, 27 → ort. 17
| P2 0–3 | P3 3–6 | P1 6–30 |      bekleme: 6, 0, 3  → ort. 3   (kısa işler önce)</div>
</div></details>

<h2 id="sjf">4. SJF ve SRTF</h2>
<p><b>SJF (en kısa iş önce):</b> sıradaki CPU patlaması en kısa olan seçilir; ortalama beklemede <b>optimaldir</b> ama patlama süresi önceden bilinmez → tahmin edilir. Kesmeli hâli <b>SRTF</b> (kalan süresi en kısa olan): yeni gelen prosesin süresi, çalışanın kalan süresinden kısaysa CPU'yu alır.</p>
<h3 id="ustel">Üstel ortalama ile tahmin</h3>
<div class="formula">τ(n+1) = α · t(n) + (1 − α) · τ(n)        0 ≤ α ≤ 1
t(n): gerçek son patlama,  τ(n): önceki tahmin</div>
<p>Örnek: α = 1/3, τ₀ = 12, t₀ = 6 → τ₁ = (1/3)·6 + (2/3)·12 = 2 + 8 = <b>10</b>. α = 0 → geçmiş önemsiz değil, yalnızca eski tahmin; α = 1 → yalnızca son patlama.</p>

<h2 id="oncelik">5. Öncelik çizelgeleme</h2>
<p>Her prosese öncelik sayısı verilir (genelde <b>küçük sayı = yüksek öncelik</b>; soruda belirtilir). Kesmeli ya da kesmesiz olabilir. Sorun: <b>açlık (starvation)</b> — düşük öncelikli proses hiç çalışamayabilir. Çözüm: <b>yaşlandırma (aging)</b>, bekledikçe önceliği artırmak.</p>

<h2 id="rr">6. Round Robin (RR)</h2>
<p>Her proses <b>q</b> (kuantum) kadar çalışır; bitmezse hazır kuyruğunun sonuna gider. n proses varsa hiçbir proses <b>(n − 1)·q</b>'dan fazla beklemez. q çok büyükse FCFS'ye döner; çok küçükse bağlam değişimi yükü artar.</p>
<div class="box key"><span class="label">Kuantum seçimi</span>Kural: CPU patlamalarının yaklaşık <b>%80'i q'dan kısa</b> olmalıdır. 10 patlamadan en fazla 2'si q'dan uzun olmalı. Örnek: q = 8 için bilinen 8 patlama ≤ 8 ise, iki bilinmeyen patlama 8'den büyük olmalıdır (6–8 aralığında olamaz).</div>

<h2 id="mlq">7. Çok seviyeli kuyruk ve geri beslemeli kuyruk</h2>
<p><b>Çok seviyeli kuyruk:</b> prosesler türüne göre (ön plan / arka plan) sabit kuyruklara ayrılır; her kuyruğun kendi algoritması vardır.</p>
<p><b>Çok seviyeli geri beslemeli kuyruk (MLFQ):</b> prosesler kuyruklar arasında <b>hareket eder</b>. Yeni proses en üst kuyruktan başlar; kuantumunu bitirip tamamlanamazsa bir alt kuyruğa <b>düşürülür (demotion)</b>. Uzun bekleyen yukarı çıkarılabilir (aging).</p>
<details class="example" open><summary>Örnek: 40 birimlik patlama, q₀ = 2, her seviyede +5</summary><div class="inner">
<div class="formula">seviye:      0    1    2    3    4
kuantum:     2    7   12   17   22
kümülatif:   2    9   21   38   60   → 40 birim 4. seviyede tamamlanır</div>
</div></details>

<h2 id="cokislem">8. Çok işlemcili çizelgeleme ve değerlendirme</h2>
<p>Asimetrik (tek işlemci karar verir) / simetrik (SMP, her işlemci kendini çizelgeler). <b>İşlemci yakınlığı (affinity):</b> proses aynı işlemcide tutulur (önbellek sıcak kalır). <b>Yük dengeleme:</b> push / pull göçü. Gerçek zamanlı çizelgeleme: Rate-Monotonic, EDF. Algoritma değerlendirme: deterministik modelleme, kuyruk modelleri (Little formülü n = λ·W), simülasyon.</p>

<h2 id="gantt">9. Sınav için Gantt şeması tarifi</h2>
<ol>
<li>Prosesleri varış zamanına göre sırala; zaman çizgisini 0'dan başlat.</li>
<li>Her olayda (varış, bitiş, kuantum sonu) algoritmanın kuralına göre sıradaki prosesi seç.</li>
<li>Her proses için <b>bitiş</b> zamanını yaz → tamamlanma = bitiş − varış, bekleme = tamamlanma − CPU, yanıt = ilk başlangıç − varış.</li>
<li>Verim = proses sayısı ÷ toplam süre (ms'yi saniyeye çevir).</li>
</ol>
`
},
{
  id: 6, exam: "final",
  title: "Proses Senkronizasyonu",
  short: "Yarış durumu, kritik bölge ve 3 koşul, Peterson, TestAndSet/CAS, mutex, semafor, sınırlı tampon, okuyucu–yazıcı, monitörler.",
  principle: "Paylaşılan veriye erişen kod kritik bölgedir; karşılıklı dışlama, ilerleme ve sınırlı bekleme birlikte sağlanmalıdır.",
  body: `
<h2 id="yaris">1. Yarış durumu</h2>
<p>Birden çok proses paylaşılan veriye eşzamanlı eriştiğinde sonuç, erişim <b>sırasına</b> bağlıysa yarış durumu vardır. Örnek: üretici <code>sayaç++</code>, tüketici <code>sayaç--</code> makine dilinde oku–değiştir–yaz adımlarına bölünür; araya girme yanlış değer üretir.</p>
<details class="example"><summary>Sınırlı tampon: üretici ve tüketici (paylaşımlı bellek)</summary><div class="inner">
<div class="formula">// üretici
while (true) {
  while (sayaç == TAMPON_BOYUTU) ;   // tampon dolu, bekle
  tampon[in] = yeniÜrün;
  in = (in + 1) % TAMPON_BOYUTU;
  sayaç++;
}
// tüketici
while (true) {
  while (sayaç == 0) ;               // tampon boş, bekle
  ürün = tampon[out];
  out = (out + 1) % TAMPON_BOYUTU;
  sayaç--;
}</div></div></details>

<h2 id="kritik">2. Kritik bölge problemi</h2>
<p>Her prosesin kodu: <b>giriş bölümü</b> (izin iste) → <b>kritik bölge</b> → <b>çıkış bölümü</b> → kalan bölüm. Bir proses kritik bölgedeyken başka proses o bölgeye giremez.</p>
<div class="box key"><span class="label">Çözümün 3 koşulu</span>1) <b>Karşılıklı dışlama (mutual exclusion)</b> 2) <b>İlerleme (progress):</b> kritik bölgede kimse yoksa girmek isteyenlerden biri sonsuza dek bekletilmez 3) <b>Sınırlı bekleme (bounded waiting):</b> bir prosesin girmeden önce diğerlerinin kaç kez gireceği sınırlıdır. ("Koşullu bekleme" bu koşullardan değildir.)</div>

<h2 id="peterson">3. Peterson çözümü (2 proses, yazılımsal)</h2>
<div class="formula">// Pi için (j = diğer proses)
do {
  flag[i] = TRUE;
  turn = j;                         // sırayı karşıya ver
  while (flag[j] && turn == j) ;    // karşı istiyor ve sıra onda → bekle
    // kritik bölge
  flag[i] = FALSE;
    // kalan bölüm
} while (TRUE);</div>
<p>Boşluk sorularında: <code>turn = j</code> ve <code>while (flag[j] && turn == j)</code> → cevap <b>j / j</b>. Modern mimarilerde komut yeniden sıralandığı için garanti değildir (bellek bariyeri gerekir).</p>

<h2 id="donanim">4. Donanımsal çözümler</h2>
<div class="formula">1  do {
2    while (TestAndSet(&kilit)) ;   // meşgul bekleme (busy waiting)
3      // kritik bölge
4    kilit = FALSE;                 // çıkış → ilerleme (progress) sağlanır
5      // kalan bölüm
6  } while (TRUE);
7  boolean TestAndSet(boolean *target) {
8    boolean rv = *target;          // eski değeri al
9    *target = TRUE;                // kilidi kapat
10   return rv; }                   // ATOMİK olarak çalışır</div>
<p><b>TestAndSet</b> ve <b>CompareAndSwap</b> atomik donanım komutlarıdır. <b>Atomik değişkenler</b> (atomic_int) bunların üzerine kuruludur. Bellek bariyeri komut sırasını zorlar.</p>

<h2 id="mutex">5. Mutex kilitleri</h2>
<p><code>acquire()</code> ve <code>release()</code>; ikisi atomik olmalıdır. Kilit boş değilse proses dönerek bekler: <b>spinlock</b> (çok çekirdekte kısa beklemeler için iyi, bağlam değişimi yok). Mutex <b>tek proses</b> erişimine izin verir.</p>

<h2 id="semafor">6. Semaforlar</h2>
<div class="formula">wait(S) {                 signal(S) {
  while (S <= 0) ;          S++;
  S--;                    }
}</div>
<ul>
<li><b>Sayan semafor:</b> değer aralığı sınırsız; N kaynağa <b>birden fazla erişim</b> + karşılıklı dışlama.</li>
<li><b>İkili semafor:</b> 0/1 → mutex gibi.</li>
<li>Meşgul bekleme yerine bekleme kuyruğu: <code>block()</code> / <code>wakeup()</code>.</li>
<li>Yanlış kullanım <b>ölümcül kilitlenme</b> ve açlığa yol açar. <b>Öncelik terslemesi</b> (priority inversion) → öncelik kalıtımı ile çözülür.</li>
</ul>
<details class="example" open><summary>Sıralama örneği: iki semaforla A/B yazdırma</summary><div class="inner">
<div class="formula">çocuk:   while(1){ wait(s2); print 'B'; post(s1); }
ebeveyn: while(1){ wait(s1); print 'A'; post(s2); }</div>
<p>s1 = 0, s2 = 1 → önce çocuk: <b>BABABA…</b> · s1 = 1, s2 = 0 → önce ebeveyn: <b>ABABAB…</b> · s1 = s2 = 0 → ikisi de bekler, çıktı yok (ölümcül kilitlenme).</p>
</div></details>

<h2 id="klasik">7. Klasik senkronizasyon problemleri</h2>
<details class="example" open><summary>Sınırlı tampon (semaforlarla)</summary><div class="inner">
<div class="formula">mutex = 1;  full = 0;  empty = N;
// üretici                    // tüketici
wait(empty);                  wait(full);
wait(mutex);                  wait(mutex);
  tampona ekle                  tampondan al
signal(mutex);                signal(mutex);
signal(full);                 signal(empty);</div></div></details>
<p><b>Okuyucular–yazıcılar:</b> birden çok okuyucu aynı anda okuyabilir, yazıcı yalnız yazmalıdır (rw_mutex, mutex, read_count). <b>Yemek yiyen filozoflar:</b> 5 filozof, 5 çubuk; herkes aynı anda sol çubuğu alırsa ölümcül kilitlenme.</p>

<h2 id="monitor">8. Monitörler</h2>
<p>Programcıya <b>daha yüksek seviyeli</b> ve güvenli bir senkronizasyon arayüzü sunan soyut veri tipi: <b>paylaşılan değişkenler</b> + onlara erişen <b>fonksiyonlar</b> + <b>başlatma kodu</b>. Monitörde aynı anda yalnız bir proses etkindir. Paylaşılan veriye <b>doğrudan erişim yoktur</b>; yalnızca monitör fonksiyonlarıyla erişilir. <b>Durum (koşul) değişkenleri</b> (<code>x.wait()</code>, <code>x.signal()</code>) ek senkronizasyon sağlar.</p>
<p><b>Java:</b> <code>synchronized</code> metotlar, <code>wait()/notify()</code>; <b>ReentrantLock</b> mutex'e benzer; Java semaforları ve durum değişkenleri. POSIX: <code>pthread_mutex_lock</code>, <code>sem_wait</code>, <code>pthread_cond_wait/signal</code> (koşul değişkeni sinyali kritik bölge girişini doğrudan kontrol etmez).</p>
`
},
{
  id: 7, exam: "final",
  title: "Ölümcül Kilitlenme (Deadlock)",
  short: "4 gerekli koşul, kaynak-atama grafı, önleme, kaçınma, Banker algoritması (güvenlik ve istek), tespit ve kurtarma.",
  principle: "Dört koşul aynı anda sağlanırsa kilitlenme olabilir; Banker algoritması güvenli diziyi bulup kilitlenmeden kaçınır.",
  body: `
<h2 id="kosul">1. Gerekli dört koşul</h2>
<div class="box key">1) <b>Karşılıklı dışlama</b> — kaynak paylaşılamaz. 2) <b>Tut ve bekle</b> — proses kaynak tutarken başka kaynak ister. 3) <b>Kesme yok (no preemption)</b> — kaynak yalnızca onu tutan proses tarafından gönüllü bırakılır. 4) <b>Döngüsel bekleme</b> — P0 P1'i, P1 P2'yi, …, Pn P0'ı bekler. "Prosesin tek örnekli kaynak istemesi" bir koşul değildir.</div>

<h2 id="rag">2. Kaynak-atama grafı</h2>
<p>Düğümler: prosesler (daire) ve kaynaklar (kare; içindeki noktalar örnek sayısı). <b>İstek kenarı</b> P → R, <b>atama kenarı</b> R → P.</p>
<ul>
<li>Döngü yoksa → kilitlenme <b>yok</b>.</li>
<li>Döngü var ve her kaynağın <b>tek örneği</b> varsa → kilitlenme <b>var</b>.</li>
<li>Döngü var ama kaynakların birden çok örneği varsa → kilitlenme <b>olabilir de olmayabilir de</b> (döngü dışındaki proses kaynak bırakıp döngüyü kırabilir).</li>
</ul>

<h2 id="yonetim">3. Yönetim yöntemleri</h2>
<div class="table-wrap"><table>
<tr><th>Yöntem</th><th>Fikir</th></tr>
<tr><td>Önleme (prevention)</td><td>4 koşuldan birini imkânsız kıl: tut-ve-bekle yerine hepsini baştan iste; kaynakları kesilebilir yap; kaynaklara sıra numarası ver ve artan sırada iste (döngüsel beklemeyi kırar)</td></tr>
<tr><td>Kaçınma (avoidance)</td><td>Her istekte sistemin <b>güvenli</b> kalıp kalmayacağını kontrol et (Banker). Kaçınmak <b>mümkündür</b></td></tr>
<tr><td>Tespit ve kurtarma</td><td>Kilitlenmeye izin ver, periyodik tespit et, kurtar (proses sonlandır / kaynak geri al)</td></tr>
<tr><td>Görmezden gelme</td><td>Çoğu işletim sistemi (devekuşu yaklaşımı)</td></tr>
</table></div>

<h2 id="banker">4. Banker algoritması</h2>
<div class="formula">Boşta (Available) = Toplam − Σ Tahsis
İhtiyaç (Need)     = Max − Tahsis
Güvenlik: İhtiyaç(Pi) ≤ Boşta olan bir Pi bul → çalıştır → Boşta += Tahsis(Pi) → tekrarla
Hepsi bitebiliyorsa sistem GÜVENLİ; bitirilemeyenler varsa GÜVENSİZ</div>
<p><b>İstek algoritması:</b> İstek ≤ İhtiyaç ve İstek ≤ Boşta olmalı; sonra istek verilmiş gibi tablo güncellenir ve güvenlik algoritması çalıştırılır. Güvenliyse istek karşılanır.</p>
<details class="example" open><summary>Örnek (çıkmış sorudan): Toplam A3 B14 C12 D12</summary><div class="inner">
<div class="table-wrap"><table>
<tr><th></th><th>Tahsis</th><th>Max</th><th>İhtiyaç</th></tr>
<tr><td>P0</td><td>0 0 1 2</td><td>0 0 1 2</td><td>0 0 0 0</td></tr>
<tr><td>P1</td><td>1 0 0 0</td><td>1 7 5 0</td><td>0 7 5 0</td></tr>
<tr><td>P2</td><td>1 3 5 4</td><td>2 3 5 6</td><td>1 0 0 2</td></tr>
<tr><td>P3</td><td>0 6 3 2</td><td>0 6 5 2</td><td>0 0 2 0</td></tr>
<tr><td>P4</td><td>0 0 1 4</td><td>0 6 5 6</td><td>0 6 4 2</td></tr>
</table></div>
<p>Σ Tahsis = (2, 9, 10, 12) → <b>Boşta = (1, 5, 2, 0)</b>. İlk adımda ihtiyacı karşılananlar: <b>P0, P3</b>. Güvenli dizi: P0 → (1,5,3,2) · P2 → (2,8,8,6) · P3 → (2,14,11,8) · P4 → (2,14,12,12) · P1 → (3,14,12,12). <b>Güvenli: P0, P2, P3, P4, P1</b>.</p>
</div></details>

<h2 id="tespit">5. Tespit algoritması</h2>
<p>Banker'a benzer ama Max/İhtiyaç yerine anlık <b>İstek (Request)</b> matrisi kullanır: veri yapıları <b>Tahsis, İstek, Boşta</b>. Tek örnekli kaynaklarda <b>bekleme grafı</b> (wait-for graph) içinde döngü aranır.</p>
<p><b>Kurtarma:</b> kilitlenen tüm prosesleri sonlandırmak ya da döngü kırılana kadar birer birer sonlandırmak; kaynak geri alma (kurban seçimi, geri sarma, açlığa dikkat).</p>
`
},
{
  id: 8, exam: "final",
  title: "Ana Bellek",
  short: "Adres bağlama, mantıksal/fiziksel adres, bitişik tahsis (first/best/worst fit), parçalanma, sayfalama, sayfa tablosu, TLB ve EAT, segmentasyon.",
  principle: "Sayfalama mantıksal adresi sayfa numarası ve ofsete böler; sayfa tablosu sayfayı çerçeveye eşler.",
  body: `
<h2 id="adres">1. Adres bağlama ve adres türleri</h2>
<p>Bağlama <b>derleme</b>, <b>yükleme</b> ya da <b>çalışma</b> zamanında yapılabilir. CPU'nun ürettiği adres <b>mantıksal (sanal)</b>, belleğin gördüğü <b>fiziksel</b> adrestir. Çeviriyi donanımdaki <b>MMU</b> yapar. Taban (base / relocation) ve sınır (limit) register'ları prosesin alanını korur.</p>
<p><b>Swapping (takas):</b> proses geçici olarak diske alınıp sonra geri getirilir.</p>

<h2 id="bitisik">2. Bitişik tahsis</h2>
<div class="table-wrap"><table>
<tr><th>Strateji</th><th>Seçilen boşluk</th></tr>
<tr><td>First-fit</td><td>Yeterli olan <b>ilk</b> boşluk</td></tr>
<tr><td>Best-fit</td><td>Yeterli olanların <b>en küçüğü</b> (en az artık)</td></tr>
<tr><td>Worst-fit</td><td>Yeterli olanların <b>en büyüğü</b></td></tr>
</table></div>
<details class="example" open><summary>Örnek: 400K, 200K, 300K, 500K, 600K bloklarına best-fit</summary><div class="inner">
<p>P1 212K → 300K · P2 417K → 500K · P3 82K → 200K · P4 426K → 600K · P5 165K → 400K. Hepsi sığar; prosesler geliş sırasıyla <b>P1, P2, P3, P4, P5</b> yerleşir. (First-fit: P1→400, P2→500, P3→200, P4→600, P5→300.)</p>
</div></details>
<p><b>Dış parçalanma:</b> toplam boş alan yeterli ama bitişik değil (bitişik tahsis ve segmentasyonda). Çözüm: sıkıştırma (compaction) ya da sayfalama. <b>İç parçalanma:</b> tahsis edilen bloğun kullanılmayan kısmı (sayfalamada son sayfa).</p>

<h2 id="sayfalama">3. Sayfalama</h2>
<p>Fiziksel bellek sabit boyutlu <b>çerçevelere</b> (frame), mantıksal bellek aynı boyutta <b>sayfalara</b> (page) bölünür. Dış parçalanma yoktur; iç parçalanma olabilir.</p>
<div class="formula">mantıksal adres = | p (sayfa no) | d (ofset) |      sayfa boyutu 2ⁿ → d için n bit
fiziksel adres  = | f (çerçeve)  | d (ofset) |      f = sayfaTablosu[p]
p = adres div sayfaBoyutu,   d = adres mod sayfaBoyutu</div>
<details class="example" open><summary>Örnek: "bilgisayar" dizisi, 3 baytlık çerçeve</summary><div class="inner">
<p>b0 i1 l2 g3 i4 <b>s5</b> a6 y7 a8 r9. 's' mantıksal adres 5 → p = 5 div 3 = 1, d = 5 mod 3 = 2. Sayfa tablosu 1 → 3 ise fiziksel adres <b>3:2</b> (çerçeve 3, ofset 2) = 3·3 + 2 = 11.</p>
</div></details>
<details class="example"><summary>Örnek: bit uzunlukları</summary><div class="inner">
<p>Sanal bellek 4 sayfa, sayfa 4 bayt → mantıksal alan 16 bayt → <b>4 bit</b> (p: 2, d: 2). Fiziksel bellek 64 bayt → <b>6 bit</b> (f: 4, d: 2) ve 64 / 4 = 16 çerçeve.</p>
<p>Proses 20.492 bayt, çerçeve 1.024 bayt → ⌈20.492 / 1.024⌉ = <b>21 sayfa</b>; son sayfada 20.492 − 20.480 = 12 bayt kullanılır → iç parçalanma 1.024 − 12 = <b>1.012 bayt</b>.</p>
</div></details>

<h2 id="tlb">4. Sayfa tablosu uygulaması, TLB ve EAT</h2>
<p>Sayfa tablosu bellekte tutulur (PTBR, PTLR register'ları) → her veri erişimi için <b>iki bellek erişimi</b> gerekir. Çözüm: hızlı ilişkisel önbellek <b>TLB</b> (translation look-aside buffer).</p>
<div class="formula">EAT = α · (TLB + bellek) + (1 − α) · (TLB + 2·bellek)
α = isabet oranı
Örnek: α = 0,90, bellek = 100 ns, TLB = 10 ns
EAT = 0,9·110 + 0,1·210 = 99 + 21 = 120 ns</div>
<p>(TLB süresi ihmal edilirse: 0,9·100 + 0,1·200 = 110 ns.) Sayfa tablosu girişlerinde <b>geçerli/geçersiz (valid-invalid) biti</b> ve koruma bitleri vardır. Paylaşılan sayfalar (yeniden girişli/reentrant kod) prosesler arasında paylaşılabilir.</p>

<h2 id="tablo">5. Sayfa tablosu yapıları</h2>
<p><b>Hiyerarşik</b> (iki seviyeli: p1, p2, d) · <b>Hash'li</b> sayfa tablosu · <b>Ters (inverted)</b> sayfa tablosu (her fiziksel çerçeve için bir giriş; bellek tasarrufu, arama yavaş).</p>

<h2 id="segment">6. Segmentasyon</h2>
<p>Bellek, kullanıcının bakış açısına göre mantıksal birimlere (kod, yığın, global değişkenler…) bölünür. Adres: &lt;segment no, ofset&gt;; segment tablosunda <b>taban</b> ve <b>sınır</b> vardır; ofset sınırdan büyükse tuzak. Dış parçalanma görülebilir.</p>
`
},
{
  id: 9, exam: "final",
  title: "Sanal Bellek",
  short: "İsteğe bağlı sayfalama, sayfa hatası adımları, EAT, copy-on-write, FIFO/Optimal/LRU/ikinci şans, Belady, çerçeve tahsisi, thrashing.",
  principle: "Sanal bellek, programın yalnızca gereken sayfalarını bellekte tutar; sayfa değiştirme algoritmaları hata sayısını belirler.",
  body: `
<h2 id="istege">1. İsteğe bağlı sayfalama (demand paging)</h2>
<p>Sayfalar yalnızca ihtiyaç duyulunca belleğe getirilir. Tembel takasçı (lazy swapper) = pager. Geçerli/geçersiz biti: geçersiz sayfaya erişim <b>sayfa hatası</b> üretir.</p>
<div class="box key"><span class="label">Sayfa hatası adımları</span>1) <b>Referansa git</b> (load M) → 2) geçersiz olduğu için <b>tuzak: sayfa hatası</b> → 3) <b>sayfa ikincil bellekte</b> (diskte) bulunur → 4) boş çerçeveye <b>olmayan sayfayı getir</b> → 5) <b>sayfa tablosunu güncelle</b> (yeniden başlat) → 6) <b>komutu yeniden başlat</b>.</div>
<div class="formula">EAT = (1 − p) · bellek erişim süresi + p · sayfa hatası servis süresi
p: sayfa hatası oranı. Örnek: 200 ns bellek, 8 ms hata → EAT = 200 + 7.999.800·p ns
%10'dan az yavaşlama için p < 0,0000025</div>
<p><b>Copy-on-write:</b> fork() sonrası ebeveyn ve çocuk aynı sayfaları paylaşır; biri yazmak isteyince sayfa kopyalanır.</p>

<h2 id="degistirme">2. Sayfa değiştirme</h2>
<p>Boş çerçeve yoksa bir <b>kurban</b> sayfa seçilir; <b>kirli bit (dirty/modify)</b> 1 ise diske yazılır. Algoritmalar referans dizisiyle karşılaştırılır.</p>
<div class="table-wrap"><table>
<tr><th>Algoritma</th><th>Kurban</th><th>Not</th></tr>
<tr><td><b>FIFO</b></td><td>Belleğe en önce gelen</td><td>Belady anomalisi: çerçeve artınca hata artabilir</td></tr>
<tr><td><b>Optimal (OPT)</b></td><td>En uzun süre kullanılmayacak olan</td><td>En az hata; gelecek bilinmediği için kıyaslama ölçütü</td></tr>
<tr><td><b>LRU</b></td><td>En uzun süredir kullanılmayan</td><td>Sayaç ya da yığınla uygulanır; Belady göstermez</td></tr>
<tr><td>İkinci şans (saat)</td><td>FIFO + referans biti; bit 1 ise 0 yapıp atlar</td><td>LRU yaklaşımı</td></tr>
<tr><td>LFU / MFU</td><td>En az / en çok kullanılan</td><td>Sayaç tabanlı</td></tr>
</table></div>
<details class="example" open><summary>Örnek: 4 çerçeve, dizi 0 2 1 6 4 0 1 0 3 1 2 1</summary><div class="inner">
<div class="formula">FIFO: 0F 2F 1F 6F | 4F(0 çık) 0F(2 çık) 1 0 | 3F(1 çık) 1F(6 çık) 2F(4 çık) 1   → 9 hata, son {2,0,3,1}
OPT : 0F 2F 1F 6F | 4F(6 çık) 0 1 0 | 3F(0 çık) 1 2 1                             → 6 hata, son {3,2,1,4}
LRU : 0F 2F 1F 6F | 4F(0 çık) 0F(2 çık) 1 0 | 3F(6 çık) 1 | 2F(4 çık) 1           → 8 hata, son {2,0,1,3}</div>
<p>Yöntem: ilk dolumda her yeni sayfa hatadır. Sonra FIFO'da en eski geleni, OPT'da ileride en geç kullanılacağı (ya da hiç kullanılmayacak) olanı, LRU'da en uzun süredir kullanılmayanı çıkar.</p>
</div></details>

<h2 id="cerceve">3. Çerçeve tahsisi</h2>
<p><b>Eşit tahsis</b> · <b>orantılı tahsis</b> (proses boyutuna göre: aᵢ = sᵢ / S · m) · öncelik tahsisi. <b>Global</b> değiştirme (tüm çerçevelerden seç) / <b>yerel</b> (yalnız kendi çerçevelerinden).</p>

<h2 id="thrashing">4. Thrashing</h2>
<p>Prosesin yeterli çerçevesi yoksa sürekli sayfa hatası oluşur; CPU kullanımı düşer, işletim sistemi daha çok proses ekler, durum kötüleşir. Çözüm: <b>çalışma kümesi (working set)</b> modeli ve <b>sayfa hatası frekansı</b> denetimi; yerellik (locality) ilkesi.</p>
<p>Diğer konular: bellek eşlemeli dosyalar, çekirdek belleği tahsisi (buddy sistemi, slab), önceden sayfalama (prepaging), sayfa boyutu seçimi, TLB erişim alanı.</p>
`
}
];
