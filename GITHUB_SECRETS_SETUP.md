# GitHub Secrets Kurulum Rehberi

GitHub Actions'da "TESTNET_PRIVATE_KEY secret is not set" hatası alıyorsunuz çünkü repository'nizde gerekli secrets ayarlanmamış.

## 🔑 Gerekli Secrets

Aşağıdaki secrets'ları GitHub repository'nizde ayarlamanız gerekiyor:

### 1. TESTNET_PRIVATE_KEY
**Test için oluşturulan private key:**
```
0f6b5254b404b1ad889c96d063f3513dd8d4a07654d5a26c695276c11c4de368
```

### 2. TESTNET_RPC_URL
**Test ağı RPC URL'i (örnek):**
```
https://testnet.example.com/rpc
```

## 📝 GitHub Secrets Nasıl Eklenir?

### Adım 1: Repository Settings
1. GitHub repository'nize gidin
2. **Settings** sekmesine tıklayın
3. Sol menüden **Secrets and variables** → **Actions** seçin

### Adım 2: Secret Ekleme
1. **New repository secret** butonuna tıklayın
2. İlk secret için:
   - **Name:** `TESTNET_PRIVATE_KEY`
   - **Secret:** `0f6b5254b404b1ad889c96d063f3513dd8d4a07654d5a26c695276c11c4de368`
3. **Add secret** butonuna tıklayın

### Adım 3: İkinci Secret
1. Tekrar **New repository secret** butonuna tıklayın
2. İkinci secret için:
   - **Name:** `TESTNET_RPC_URL`
   - **Secret:** `https://testnet.example.com/rpc` (gerçek RPC URL'inizi girin)
3. **Add secret** butonuna tıklayın

## ⚠️ Önemli Notlar

### Güvenlik
- Bu private key sadece TEST amaçlıdır
- Gerçek para içeren hesaplar için ASLA kullanmayın
- Production için kendi private key'inizi oluşturun

### Test Private Key Özellikleri
- Rastgele oluşturulmuş 64 karakter hex string
- Ethereum uyumlu private key formatı
- Sadece test ve geliştirme için güvenli

### RPC URL
- Gerçek bir testnet RPC URL'i kullanın
- Örnek: Sepolia, Goerli, veya kendi test ağınız
- Yerel test için: `http://127.0.0.1:8545`

## 🔄 Workflow Testi

Secrets'ları ekledikten sonra:
1. Repository'ye yeni bir commit push edin
2. Actions sekmesinden workflow'un çalıştığını kontrol edin
3. "Deploy to Testnet" adımının başarılı olduğunu doğrulayın

## 🛠️ Alternatif Çözümler

### Yerel Geliştirme
Yerel geliştirme için `.env` dosyası oluşturun:
```bash
cp .env.example .env
```

`.env` dosyasına ekleyin:
```
PRIVATE_KEY=0f6b5254b404b1ad889c96d063f3513dd8d4a07654d5a26c695276c11c4de368
RPC_URL=http://127.0.0.1:8545
```

### Production Kullanımı
Production için:
1. Kendi private key'inizi oluşturun
2. Güvenli bir şekilde saklayın
3. GitHub secrets'a ekleyin
4. Test ağında önce deneyin

## 📞 Yardım

Sorun yaşarsanız:
1. Secrets'ların doğru isimde olduğunu kontrol edin
2. Private key'in 64 karakter hex olduğunu doğrulayın
3. RPC URL'in erişilebilir olduğunu test edin