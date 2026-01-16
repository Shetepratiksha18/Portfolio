# Deployment Steps (Netlify)

This document explains how to deploy this portfolio website on **Netlify**.

## 🌐 Live Portfolio
https://relaxed-cucurucho-a2a4f7.netlify.app/

---

## 🚀 Steps to Deploy on Netlify

### 1. Push Project to GitHub
- Create a GitHub repository
- Upload all files (`index.html`, CSS, JS, assets)

Or using git:
```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main

Go to https://www.netlify.com/

Login using GitHub

Click Add new site → Import an existing project

Select GitHub and choose your repository

Configure settings:

Build command: (leave empty)

Publish directory: /

Click Deploy site
