# FHEVM Starter Hardhat Project

Bu proje, FHEVM (Fully Homomorphic Encryption Virtual Machine) üzerinde çalışan akıllı kontratlar geliştirmek için bir başlangıç şablonudur.

## 🚀 Özellikler

- ✅ TypeScript desteği
- ✅ Hardhat framework entegrasyonu
- ✅ Otomatik test süiti
- ✅ CI/CD pipeline (GitHub Actions)
- ✅ Kod formatı kontrolü (Prettier)
- ✅ Güvenlik denetimi (Slither)
- ✅ PrivateCounter örnek kontratı

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Git

## 🛠️ Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone <repository-url>
   cd fhevm-starter-hardhat
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Environment dosyasını oluşturun:**
   ```bash
   cp .env.example .env
   ```

4. **Environment değişkenlerini ayarlayın:**
   `.env` dosyasını düzenleyerek gerekli değişkenleri ayarlayın.

## 🔧 Kullanım

### Kontratları Derleme
```bash
npm run build
# veya
npx hardhat compile
```

### Testleri Çalıştırma
```bash
npm test
# veya
npx hardhat test
```

### Test Coverage
```bash
npm run coverage
```

### Yerel Ağ Başlatma
```bash
npm run node
# veya
npx hardhat node
```

### Deployment

#### Yerel Ağa Deploy
```bash
npm run deploy:local
# veya
npx hardhat run scripts/deploy.ts --network localhost
```

#### Test Ağına Deploy
```bash
npm run deploy:dev
# veya
npx hardhat run scripts/deploy.ts --network dev
```

### Kontrat ile Etkileşim
```bash
npm run interact
# veya
npx hardhat run scripts/interact.ts --network localhost
```

## 📁 Proje Yapısı

```
fhevm-starter-hardhat/
├── contracts/           # Akıllı kontratlar
│   └── PrivateCounter.sol
├── scripts/            # Deployment ve etkileşim scriptleri
│   ├── deploy.ts
│   └── interact.ts
├── test/               # Test dosyaları
│   └── PrivateCounter.ts
├── .github/workflows/  # CI/CD pipeline
│   └── ci.yml
├── hardhat.config.ts   # Hardhat konfigürasyonu
├── package.json        # Proje bağımlılıkları
├── tsconfig.json       # TypeScript konfigürasyonu
└── .env.example        # Environment değişkenleri örneği
```

## 🔐 Environment Değişkenleri

Aşağıdaki environment değişkenlerini `.env` dosyasında ayarlayın:

- `PRIVATE_KEY`: Deployment için kullanılacak private key
- `RPC_URL`: Bağlanılacak ağın RPC URL'i
- `COUNTER_ADDR`: Deploy edilen kontratın adresi (deployment sonrası)

## 📝 Mevcut Scriptler

- `npm run build`: Kontratları derle
- `npm test`: Testleri çalıştır
- `npm run coverage`: Test coverage raporu oluştur
- `npm run deploy:local`: Yerel ağa deploy et
- `npm run deploy:dev`: Test ağına deploy et
- `npm run interact`: Kontrat ile etkileşim kur
- `npm run node`: Yerel Hardhat ağını başlat
- `npm run clean`: Cache ve artifacts'ları temizle
- `npm run lint`: Kod formatını kontrol et
- `npm run format`: Kodu formatla
- `npm run typecheck`: TypeScript kontrolü yap

## 🔄 CI/CD Pipeline

GitHub Actions ile otomatik CI/CD pipeline kurulmuştur:

1. **Test Suite**: Kod testleri ve coverage
2. **Security Audit**: Güvenlik denetimi
3. **Deploy to Testnet**: Test ağına otomatik deployment
4. **Release**: Versiyon yönetimi

## 🛡️ Güvenlik

- Slither ile otomatik güvenlik analizi
- npm audit ile bağımlılık güvenlik kontrolü
- Private key'lerin güvenli yönetimi

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje ISC lisansı altında lisanslanmıştır.

## 🆘 Yardım

Sorunlarla karşılaştığınızda:

1. Environment değişkenlerinin doğru ayarlandığından emin olun
2. Node.js ve npm versiyonlarını kontrol edin
3. `npm install` komutunu tekrar çalıştırın
4. GitHub Issues bölümünden yardım isteyin

## 🔗 Faydalı Linkler

- [Hardhat Documentation](https://hardhat.org/docs)
- [FHEVM Documentation](https://docs.fhevm.org)
- [Ethers.js Documentation](https://docs.ethers.org)