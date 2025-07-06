
# 📸 Photo Gallery App (React + PHP)

A responsive Photo Gallery web application built using **React (frontend)** and **PHP with MySQL (backend)**. This project allows an admin to upload, publish/unpublish, or delete images, while users can view and download published images.

---

## 🌟 Features

- 🔓 **User View:** 
  - See all published images
  - Download images in one click
- 🛠️ **Admin Panel:**
  - Upload images with metadata
  - Publish/Unpublish toggle
  - Delete images with confirmation
- 📱 **Fully Responsive**: Mobile-friendly layout using Bootstrap + custom CSS
- 🌐 **Hosted frontend**: React app deployed (e.g., on Vercel/InfinityFree)
- 🗂️ **Hosted backend**: PHP API + MySQL database

---

## 📂 Project Structure

```
real-estate-photo-gallery/
├── frontend/          # React (Vite) project
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   ├── public/
│   └── ...
├── backend/           # PHP project
│   ├── api/
│   │   ├── get_images.php
│   │   ├── upload.php
│   │   ├── delete_image.php
│   │   └── toggle_publish.php
│   ├── uploads/
│   └── db.php
└── README.md
```

---

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Bootstrap, Custom CSS
- **Backend**: PHP (MySQLi), MySQL
- **Deployment**: Vercel (Frontend), InfinityFree (Backend)

---

## 🚀 Getting Started

### 🖥️ Clone Repository

```bash
git clone https://github.com/YourUsername/Photo-Gallery.git
cd Photo-Gallery
```

---

### ⚙️ Backend Setup (PHP + MySQL)

1. Import the MySQL database from `gallery.sql` (if included)
2. Set up `backend/db.php` with your credentials:

```php
<?php
$host = "your_host";
$user = "your_user";
$password = "your_password";
$dbname = "your_db";
$conn = new mysqli($host, $user, $password, $dbname);
?>
```

3. Upload `/backend/` to your hosting provider (e.g., InfinityFree `htdocs/`)

---

### ⚛️ Frontend Setup (React + Vite)

1. Navigate to the `frontend` folder:
```bash
cd frontend
npm install
```

2. Create a `.env` file and add:

```
VITE_BACKEND_URL=https://yourbackenddomain.com/backend
```

3. Run locally:
```bash
npm run dev
```

4. Or build for production:
```bash
npm run build
```

Then upload the `dist/` folder contents to your web hosting (e.g., InfinityFree inside `htdocs/`).

---

## 🖼️ Screenshots

![Gallery View](screenshots/gallery-user.png)
![Admin View](screenshots/gallery-admin.png)

---

## 🔐 Admin Credentials

If applicable, login with:

```
Username: admin
Password: ********
```

(Adjust as necessary or use session authentication)

---

## 🧪 Test the Live Project

- 🖼️ **User View:** `https://yourdomain.com`
- 🔧 **Admin Panel:** `https://yourdomain.com/admin`

---

## 🤝 Contributing

Pull requests are welcome! To contribute:

1. Fork the project
2. Create your feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Create a new Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

**Oluyinka Oluwaseun Emmanuel**

- GitHub: [@Oluwaseun55](https://github.com/Oluwaseun55)
- Email: oluyinkaoluwaseun6@gmail.com

---
