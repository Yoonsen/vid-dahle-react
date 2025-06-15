# Deployment & Troubleshooting Logbook

## [Date: YYYY-MM-DD]

### Actions Taken
- Attempted to deploy React app to GitHub Pages using `npm run deploy`.
- Build succeeded, but deployment failed with `ENAMETOOLONG` error (Windows path length issue).
- Advised to move project to a shorter path (e.g., `C:\vid-dahle-react`) and retry deployment.
- Considering alternative deployment via SSH tunnel and port forwarding.
- Plan: Pull latest changes on remote server via SSH, test app with port forwarding, and observe if static asset paths and data loading work as expected.

### Next Steps
- Move project to a shorter path if deploying from Windows.
- If using SSH/port forwarding, ensure correct port mapping and test app in browser.
- Document results and any new issues in this logbook. 