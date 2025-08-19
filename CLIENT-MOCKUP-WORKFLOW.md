# Client Mockup Workflow 🚀

## Quick Setup for Each New Client

### 1. Create Branch & Customize
```bash
# Create new branch from main template
git checkout main
git checkout -b client-name-mockup

# Make your customizations:
# - Update company name
# - Change colors/theme  
# - Update contact info
# - Modify services
# - Add location details
```

### 2. Create Separate Repository
```bash
# Create new GitHub repo
gh repo create client-name-website --public --description "Custom mockup for [Client Name]"

# Add as remote and push
git remote add client-origin https://github.com/dathunybeats/client-name-website.git
git push client-origin client-name-mockup:main
```

### 3. Deploy to Vercel
```bash
# Clone the new repo
cd ..
git clone https://github.com/dathunybeats/client-name-website.git
cd client-name-website

# Deploy to Vercel (gets own free deployment)
vercel --prod
```

### 4. Share with Client
- **Live URL**: `https://client-name-website.vercel.app`
- **GitHub**: `https://github.com/dathunybeats/client-name-website`

---

## Benefits of This Approach ✅

- **Unlimited free deployments** (each repo = free Vercel deployment)
- **Clean, professional URLs** for each client
- **Independent websites** - changes don't affect other clients
- **Easy maintenance** - each client has their own repository
- **Professional presentation** - custom domain per client

---

## Example Workflow in Action

### Nitro Detailing Example:
1. ✅ Created `nitro-detailing-mockup` branch
2. ✅ Customized: Blue theme, Kent & East Sussex location, mobile focus
3. ✅ Created repo: `nitro-detailing-website`
4. ✅ Deployed: `https://nitro-detailing-website-pakhhqkke.vercel.app`
5. ✅ Ready to share with client!

### Next Client Example:
```bash
git checkout main
git checkout -b bmw-dealership-mockup
# Customize for BMW dealership...
gh repo create bmw-dealership-website --public
# Deploy and share: https://bmw-dealership-website.vercel.app
```

---

## Template Repository
- **Main template**: `website-for-detailers` (this repo)
- **Keep this clean** - all client work happens in branches/separate repos
- **Update template** as needed for new features

---

## Automation Script
Run `.\create-client-mockup.ps1` with client details to automate the process!
