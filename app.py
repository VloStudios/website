from flask import Flask, render_template, jsonify
import requests
import os

app = Flask(__name__)

GITHUB_USERNAME = "VloStudios"
GITHUB_API_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"

@app.route('/')
def index():
    # Fetch repositories from GitHub
    try:
        response = requests.get(GITHUB_API_URL, timeout=5)
        if response.status_code == 200:
            repos = response.json()
            # Filter out forks if desired, sort by updated
            repos = [repo for repo in repos if not repo['fork']]
            repos.sort(key=lambda x: x['updated_at'], reverse=True)
        else:
            repos = []
    except Exception:
        repos = []

    return render_template('index.html', repos=repos)

@app.route('/api/repos')
def api_repos():
    try:
        response = requests.get(GITHUB_API_URL, timeout=5)
        if response.status_code == 200:
            repos = response.json()
            repos = [repo for repo in repos if not repo['fork']]
            repos.sort(key=lambda x: x['updated_at'], reverse=True)
            # Return only needed fields
            data = [{
                'name': repo['name'],
                'description': repo['description'],
                'html_url': repo['html_url'],
                'language': repo['language'],
                'updated_at': repo['updated_at'],
                'stargazers_count': repo['stargazers_count']
            } for repo in repos]
            return jsonify(data)
        else:
            return jsonify([])
    except Exception:
        return jsonify([])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)