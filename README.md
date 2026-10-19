<div align="center">

<img src="assets/images/icon.png" alt="QPackageTracker icon" width="128">

# QPackageTracker

Follow your packages from label to doorstep, from USPS, UPS, FedEx, DHL and more, and get told when something changes.

[![Latest release](https://img.shields.io/github/v/release/Quynn-Software-Solutions/QPackageTracker-releases?label=latest)](https://github.com/Quynn-Software-Solutions/QPackageTracker-releases/releases/latest)
[![Beta](https://img.shields.io/github/v/release/Quynn-Software-Solutions/QPackageTracker-releases?include_prereleases&label=beta)](https://github.com/Quynn-Software-Solutions/QPackageTracker-releases/releases)
![Platforms](https://img.shields.io/badge/platforms-Windows%20%7C%20Linux-blue)

<img src="assets/images/main-light.png" alt="QPackageTracker main window" width="820">

[Download](#download) | [Screenshots](#screenshots) | [Free and Business](#free-and-business) | [Verify a download](#verify-a-download) | [Support](#support) | [License](#license-and-attributions)

</div>

QPackageTracker is a desktop app for Windows and Linux that keeps an eye on your tracking numbers: USPS for everyone, and UPS, FedEx, DHL and more with Business. Add a number, or paste or import a whole list. The app checks the carrier's official API on a schedule you control, keeps each package's full event history, and notifies you with the schedules you set up: a desktop notification when a package is out for delivery, an email to a customer when it arrives, a reminder if it hasn't moved in three days.

It runs quietly in the system tray, works offline between checks, and keeps everything on your computer. There is no account with us, no ads and no analytics.

This repository holds the **release downloads only**. The source code is private.

## Download

Get the latest version from the **[Releases page](https://github.com/Quynn-Software-Solutions/QPackageTracker-releases/releases/latest)**. Each release has:

| File | Use it when |
|---|---|
| `QPackageTracker-<version>-windows-installer.exe` | **Windows (recommended).** Installs for your Windows account only, so no administrator rights are needed. Updates install from inside the app. |
| `QPackageTracker-<version>-windows-portable.zip` | You want to run it from a folder or a USB drive without installing. It tells you about updates but doesn't install them. |
| `QPackageTracker_<version>_amd64.deb` | **Linux, Ubuntu 22.04 or newer, or Debian 12 or newer.** Installs to `/opt/QPackageTracker`, with a `qpackagetracker` command and a menu entry. Updates install from inside the app. |
| `QPackageTracker-<version>-x86_64.AppImage` | **Linux, any distribution that runs AppImages.** A single file: mark it executable and run it. Updates install from inside the app. |
| `QPackageTracker-<version>-x86_64.flatpak` | Flatpak, sandboxed, any distribution with Flatpak; install with the commands below. The app tells you about updates. |
| `QPackageTracker_<version>_amd64.snap` | Snap, sandboxed; install with the commands below. The app tells you about updates. Built by hand, so not every release has one yet. |
| `QPackageTracker-Demo-<version>-windows-portable.zip` and `QPackageTracker-Demo-<version>-linux-portable.tar.gz` | You want to try the app with sample packages before setting it up. The demo needs no credentials, sends nothing and saves nothing, and runs beside the real app. |
| `SHA256SUMS.txt` and `*.sig` | To check a download is genuine (see [Verify a download](#verify-a-download)). |

On Windows, pick the installer. On Linux, pick the `.deb` on Ubuntu or Debian, the AppImage on any other distribution that runs AppImages, or the Flatpak or Snap if you prefer a sandboxed install (sandboxed installs tell you about updates but don't install them; install the newer file to update).

**Installing on Linux**

```
# .deb (Ubuntu, Debian)
sudo apt install ./QPackageTracker_<version>_amd64.deb
# Flatpak
flatpak remote-add --user --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo
flatpak install --user ./QPackageTracker-<version>-x86_64.flatpak
# Snap
sudo snap install --dangerous ./QPackageTracker_<version>_amd64.snap
# AppImage
chmod +x QPackageTracker-<version>-x86_64.AppImage && ./QPackageTracker-<version>-x86_64.AppImage
```

All Linux builds are 64-bit (x86_64).

**Requirements**

- Windows 10 or 11, 64-bit, or a 64-bit Linux desktop: Ubuntu 22.04 or newer, Debian 12 or newer, or any distribution that runs AppImages (X11 or Wayland).
- A system tray for the tray features. On some Linux desktops a tray extension must be enabled.
- Tracking data from one of:
  - **USPS API:** free credentials from a USPS Business Account. The first-run setup walks you through getting them, with screenshots.
  - **[Trace API](https://traceapi.dev/):** its free plan covers 1,000 lookups a month.
  - **Business only:** your own UPS, FedEx, DHL or Ship24 developer keys.
- **Optional:** classic Outlook for Windows (for the Outlook email channel), or any SMTP mail server.

**First run.** The setup wizard asks for your tracking credentials and how often to check packages. It then asks how you'd like to be notified, and for a vault password. Credentials are stored encrypted (AES-256-GCM). On Windows they unlock with your Windows sign-in by default. On Linux the vault asks for its password.

A guided tour runs on the first start; replay it any time with **Help > Tutorial** (F1).

Want to look around first? **Help > Try Demo Mode** opens the app with sample packages and sends nothing, or download the demo archive above.

## Screenshots

<table>
  <tr>
    <td align="center"><img src="assets/images/main-dark.png" alt="Packages and timeline" width="280"><br>Packages and timeline</td>
    <td align="center"><img src="assets/images/calendar-light.png" alt="Calendar and reminders" width="280"><br>Calendar and reminders</td>
    <td align="center"><img src="assets/images/schedule-dark.png" alt="Notification schedule" width="280"><br>Notification schedule</td>
  </tr>
</table>

More in the **[screenshot gallery](GALLERY.md)**: every dialog in the light and dark themes.

## Features

- **Add, paste or import.** Paste a list or import a CSV or Excel file. The preview flags duplicates and invalid numbers, and can restore archived duplicates.
- **Polling you control.** Check intervals by status, working hours (overnight and weekday-only too) and per-package schedules, with a drag-to-edit preview of a day of checks.
- **Stays inside your API quota.** The app forecasts the calls your packages need against your plan and, if they don't fit, stretches the intervals just enough. **Tools > API Usage** shows calls per provider for today, the week and the month.
- **Primary and fallback providers.** Pick which provider is asked first and which one answers when it can't: out of calls, down, or doesn't know the number.
- **Check Queue.** **Tools > Check Queue** lists every package in the order it will be checked. Move packages to the front, skip a check, pause, or check everything now.
- **Notification schedules.** Trigger on any status change, a chosen status, a quiet period ("no update for 3 days"), daily times or a delay after delivery. Each schedule can notify, add a reminder, add a note, check now, pause or archive.
- **Channels.** Desktop notifications for everyone. With Business: classic Outlook (Windows), SMTP email, SMS (Twilio), Slack, Microsoft Teams, Discord and webhooks. All with quiet hours and automatic retries.
- **Calendar and reminders.** Every event, expected delivery and reminder on a month, week, day or agenda view.
- **Archive.** Delivered packages archive themselves and keep their full history.
- **Encrypted vault.** Credentials and API keys are encrypted with AES-256-GCM behind your vault password, with a one-time recovery code.
- **Tray app.** Starts at login if you want (Windows and Linux), and keeps tracking with the window closed.
- **Business extras.** Order and customer fields, proof-of-delivery PDFs, claims reminders with filing deadlines, automatic intake (watched folder, email inbox, local HTTP API) and automatic backups. See [Free and Business](#free-and-business).

## Free and Business

QPackageTracker is free for personal use. A **Business** license is for tracking at volume, across carriers, and notifying other people. Every paid feature below is Business only; Free users see them in the app with a lock.

| Feature | Free | Business |
|---|---|---|
| **Included in both** | | |
| USPS and Trace API tracking, on every API plan | Yes | Yes |
| Desktop notifications (Windows, Linux) | Yes | Yes |
| Import, export, calendar, reminders, notification schedules, polling controls | Yes | Yes |
| Updates | Every update | Every update |
| **Business only** | | |
| Packages tracked at once (archived packages are unlimited) | 10 | Unlimited |
| Email: Outlook (classic) and SMTP | No | Yes |
| More notification channels: SMS (Twilio), Slack, Microsoft Teams, Discord and signed webhooks | No | Yes |
| More carriers: UPS, FedEx, DHL, and Ship24 for everything else | No | Yes |
| Order and customer fields (order number, customer, tags), in templates and imports | View only | Yes |
| Proof of delivery PDFs | No | Yes |
| Claims reminders for lost or damaged packages, with filing deadlines | No | Yes |
| Automatic intake: watched folder, email inbox, local API | No | Yes |
| Automatic backups with restore, plain or encrypted | No | Yes |

- **Entering a key:** enter it under **Help > License...**. One license covers one computer.
- **Moving a license:** reset it in the license portal, then activate it on the new PC.
- **Offline use:** a licensed install keeps working offline for 30 days, and warns you a week before that runs out.
- **If a license lapses:** nothing is deleted.
  - Notifications on Business channels (email, SMS, Slack and the others) are held, not lost, until a license is active again.
  - If more than 10 packages are being tracked, you choose which 10 keep updating. The others pause with their history intact.

## Updates

The app checks for updates once a day. You can also use **Help > Check for Updates...**.

- Updates install only when you click **Install**, unless you turn on **Settings > Updates > Install automatically when idle**. That installs during quiet hours, while the PC is idle.
- Every release is **signed**. The built-in updater verifies the signature and checksum before installing anything, and refuses a release that fails.
- **Beta channel:** opt in under **Settings > Updates** to get prerelease (`-dev`) builds early. They're signed the same way.
- Your packages, settings, vault and license are kept across updates.

## Verify a download

Each release publishes `SHA256SUMS.txt` and a detached GPG signature for it and for each file.

**Check the checksum (Windows, PowerShell):**

```powershell
Get-FileHash .\QPackageTracker-<version>-windows-installer.exe -Algorithm SHA256
```

Compare the result with the matching line in `SHA256SUMS.txt`.

**Check the checksum (Linux):**

```bash
sha256sum -c SHA256SUMS.txt --ignore-missing
```

**Check the signature (GnuPG):**

Download [`release-key.asc`](release-key.asc) from this repository, then:

```bash
gpg --import release-key.asc
gpg --verify SHA256SUMS.txt.sig SHA256SUMS.txt
```

The release key belongs to **Quynn Software Solutions Releases &lt;support@quynnsoftware.com&gt;**. Releases are signed with its signing subkey. Check both fingerprints after importing (`gpg --fingerprint --with-subkey-fingerprints support@quynnsoftware.com`):

```
Primary key:     3C75 B652 329B 6E83 418D  2E42 F26A 01B8 D318 6209
Signing subkey:  1314 8CB8 BA81 DBBE 818E  1E82 3BF0 AD78 064B 4BA4
```

The installer and the app are also code-signed (Authenticode) once the certificate is in place. Windows shows the publisher in the install prompt.

The app also checks its own files when it starts. If they've been modified or damaged it won't open, and it asks you to reinstall from this page. Your data is not affected.

## Privacy

Your packages, history, notes, schedules and settings stay in a database on your computer, and credentials are encrypted in the vault. The app has no telemetry, analytics, crash reporting or ads, and free use needs no account with us.

What leaves your computer, and only in these cases:

- **Tracking checks:** the tracking number and your API credentials go to the provider you choose: USPS or Trace, or with Business, UPS, FedEx, DHL or Ship24.
- **Network check:** about once a minute the app opens a connection to your main provider's API host to see if it is reachable. No data is sent.
- **Notifications you set up:** the message and the addresses or numbers you enter go to the service that delivers it (your SMTP server, classic Outlook, Twilio, or the Slack, Teams, Discord or webhook URL you enter). Desktop notifications stay on the computer.
- **Email intake (Business):** the app signs in to the IMAP mailbox you set up to read new messages.
- **License check (only with a license key):** at most once a day the app sends the key, a hash of the machine ID, a hash of the install folder, the app version and a random nonce to `my.quynnsoftware.com`. The server also sees your IP address. Nothing about your packages is sent. Without a key nothing is sent.
- **Update check:** once a day the updater asks GitHub for the latest release in this repository. GitHub sees your IP address. Turn it off under **Settings > Updates**. The demo never checks.

The local HTTP API (Business) listens on `127.0.0.1` only, unless you set it up otherwise.

## Support

- Email **support@quynnsoftware.com** with the version (Help > About) and, if something went wrong, the logs (Help > Logging > Collect Logs, on Windows and Linux alike).
- Report a problem with a release by opening an issue on this repository.

---

## Trademarks and affiliation

QPackageTracker is not affiliated with, endorsed by or sponsored by any of the services below. Each service's name, marks and logos belong to its owner and are used only to identify that service. Use of the USPS API is subject to the USPS terms and conditions. Terms and privacy links for each service are under Help > Vendor Documentation.

- USPS is a trademark of United States Postal Service. QPackageTracker is not affiliated with, endorsed by or sponsored by United States Postal Service.
- Trace is a trademark of Trace API (traceapi.dev). QPackageTracker is not affiliated with, endorsed by or sponsored by Trace API (traceapi.dev).
- UPS is a trademark of United Parcel Service of America, Inc. QPackageTracker is not affiliated with, endorsed by or sponsored by United Parcel Service of America, Inc.
- FedEx is a trademark of FedEx Corporation. QPackageTracker is not affiliated with, endorsed by or sponsored by FedEx Corporation.
- DHL is a trademark of Deutsche Post AG (DHL Group). QPackageTracker is not affiliated with, endorsed by or sponsored by Deutsche Post AG (DHL Group).
- Ship24 is a trademark of Ship24. QPackageTracker is not affiliated with, endorsed by or sponsored by Ship24.
- Outlook (classic) is a trademark of Microsoft Corporation. QPackageTracker is not affiliated with, endorsed by or sponsored by Microsoft Corporation.
- SMS (Twilio) is a trademark of Twilio Inc. QPackageTracker is not affiliated with, endorsed by or sponsored by Twilio Inc.
- Slack is a trademark of Slack Technologies, LLC. QPackageTracker is not affiliated with, endorsed by or sponsored by Slack Technologies, LLC.
- Discord is a trademark of Discord Inc. QPackageTracker is not affiliated with, endorsed by or sponsored by Discord Inc.
- Microsoft Teams is a trademark of Microsoft Corporation. QPackageTracker is not affiliated with, endorsed by or sponsored by Microsoft Corporation.

Carrier and service logos come from Simple Icons (CC0 1.0) and remain the trademarks of their owners.

## License and attributions

QPackageTracker is proprietary software, free for personal use. Business use needs a Business license.

- **[LICENSE](LICENSE):** copyright and the short version of the terms.
- **[EULA.txt](EULA.txt):** the End-User License Agreement. The installer shows it before installing.
- **[ATTRIBUTIONS.md](ATTRIBUTIONS.md):** the open-source components and artwork the app includes, with their licenses and where to get their source.

© 2026 Quynn Software Solutions. All rights reserved.

App icon: `assets/images/icon.png` (PNG, 256 px) and `assets/images/icon.svg`.
