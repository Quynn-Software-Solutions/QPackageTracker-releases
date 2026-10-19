# Attributions

QPackageTracker is proprietary software by Quynn Software Solutions (see [LICENSE](LICENSE) and [EULA.txt](EULA.txt)). The release files include the third-party components below. Each one stays under its own license, and nothing in the QPackageTracker license limits the rights those licenses give you.

The license texts of the icon sets, the brand-logo notes and the USPS terms also ship inside the app, in the `notices` folder of the install directory.

[< Back to README](README.md)

## Runtime and libraries

These are bundled into every build (Windows installer, portable zip, `.deb`, AppImage, Flatpak, Snap and the demo archives). The versions are the ones used for v0.0.1.

| Component | Version | License | Source |
|---|---|---|---|
| [Python](https://www.python.org/) | 3.14 | PSF License 2.0 | https://github.com/python/cpython |
| [Qt](https://www.qt.io/) (QtCore, QtGui, QtWidgets, QtSvg, QtNetwork) | 6.12 | LGPL-3.0 | https://download.qt.io/official_releases/qt/ |
| [PySide6](https://doc.qt.io/qtforpython-6/) and shiboken6 (Qt for Python) | 6.12.0 | LGPL-3.0 | https://code.qt.io/cgit/pyside/pyside-setup.git/ |
| [cryptography](https://cryptography.io/) | 50.0.2 | Apache-2.0 or BSD-3-Clause | https://github.com/pyca/cryptography |
| [OpenSSL](https://www.openssl.org/) (inside cryptography and Python) | 3.x | Apache-2.0 | https://github.com/openssl/openssl |
| [cffi](https://cffi.readthedocs.io/) | 2.1.1 | MIT-0 | https://github.com/python-cffi/cffi |
| [pycparser](https://github.com/eliben/pycparser) | 3.11 | BSD-3-Clause | https://github.com/eliben/pycparser |
| [PyYAML](https://pyyaml.org/) | 6.0.3 | MIT | https://github.com/yaml/pyyaml |
| [requests](https://requests.readthedocs.io/) | 2.34.2 | Apache-2.0 | https://github.com/psf/requests |
| [urllib3](https://urllib3.readthedocs.io/) | 2.8.0 | MIT | https://github.com/urllib3/urllib3 |
| [idna](https://github.com/kjd/idna) | 3.20 | BSD-3-Clause | https://github.com/kjd/idna |
| [charset-normalizer](https://github.com/jawah/charset_normalizer) | 3.5.2 | MIT | https://github.com/jawah/charset_normalizer |
| [certifi](https://github.com/certifi/python-certifi) (Mozilla CA bundle) | 2026.7.22 | MPL-2.0 | https://github.com/certifi/python-certifi |
| [openpyxl](https://openpyxl.readthedocs.io/) | 3.1.5 | MIT | https://foss.heptapod.net/openpyxl/openpyxl |
| [et_xmlfile](https://foss.heptapod.net/openpyxl/et_xmlfile) | 2.0.0 | MIT | https://foss.heptapod.net/openpyxl/et_xmlfile |
| [defusedxml](https://github.com/tiran/defusedxml) | latest at build time | PSF License 2.0 | https://github.com/tiran/defusedxml |
| [pywin32](https://github.com/mhammond/pywin32) (Windows builds only) | 312 | PSF License | https://github.com/mhammond/pywin32 |

### Qt and PySide6 (LGPL-3.0)

Qt and PySide6 are used under the GNU Lesser General Public License v3.0 (https://www.gnu.org/licenses/lgpl-3.0.html), and are not modified. They are installed as separate shared libraries in the app's install folder (`PySide6` and its Qt libraries), so you can replace them with your own compatible build. The complete source for the versions used is available from the Qt Project at the links above. To ask for a copy of the source, email support@quynnsoftware.com.

### certifi (MPL-2.0)

The CA certificate bundle from certifi is used unmodified under the Mozilla Public License 2.0 (https://mozilla.org/MPL/2.0/). Its source is at https://github.com/certifi/python-certifi.

### Python runtime

The bundled Python interpreter includes libraries under their own permissive licenses, among them SQLite (public domain), libffi (MIT), zlib (zlib license), bzip2 (bzip2 license), XZ Utils / liblzma (0BSD) and Expat (MIT). See https://docs.python.org/3/license.html.

## Packaging

| Component | Used for | License | Source |
|---|---|---|---|
| [PyInstaller](https://pyinstaller.org/) bootloader | Starts the bundled app on every platform | GPL-2.0-or-later with the PyInstaller bootloader exception, which allows it in programs under any license | https://github.com/pyinstaller/pyinstaller |
| [Inno Setup](https://jrsoftware.org/isinfo.php) | Windows installer | Inno Setup License | https://github.com/jrsoftware/issrc |
| [AppImage type 2 runtime](https://github.com/AppImage/type2-runtime) (via appimagetool 1.9.0) | The AppImage | MIT | https://github.com/AppImage/type2-runtime |

The Flatpak and the Snap use their platform runtime, which Flatpak or snapd installs separately. It is not part of the release files.

## Icons and artwork

- **[Material Design Icons](https://pictogrammers.com/library/mdi/)** by Pictogrammers: the app's interface icons, and the package glyph in the QPackageTracker app icon. Apache License 2.0 (https://www.apache.org/licenses/LICENSE-2.0).
- **[Simple Icons](https://simpleicons.org/)** v13.21.0: the carrier and service logos (USPS, UPS, FedEx, DHL, Twilio, Discord, Slack). CC0 1.0 Universal. Some logos were recoloured in their brand colours or placed on a tile; the shapes are unchanged.
- **Microsoft Outlook and Microsoft Teams logos:** shapes from Material Design Icons (Apache License 2.0), filled in Outlook blue (#0078D4) and Teams purple (#5059C9).

The logos are trademarks of their owners and are used only to identify the service you choose. QPackageTracker is not affiliated with, endorsed by or sponsored by any of them. See [Trademarks and affiliation](README.md#trademarks-and-affiliation).

## Third-party services and documents

- **USPS APIs:** use of the USPS APIs is subject to the USPS terms and conditions, which the app shows under Help > Vendor Documentation > USPS terms and conditions. The USPS API setup guide in the app shows screenshots of the USPS Customer Onboarding Portal, to help you get your own API credentials.
- **Trace API, UPS, FedEx, DHL, Ship24, Twilio, Slack, Microsoft Teams, Discord:** used only through each service's documented API with your own credentials, and subject to that service's terms. Links to each service's terms and privacy policy are in the app under Help > Vendor Documentation.

## Updater

In-app updates are installed by the QPackageTracker updater, a build of QUpdateTool v0.0.2 by Quynn Software Solutions, branded for QPackageTracker. It verifies each release's GPG signature (see [Verify a download](README.md#verify-a-download)) before installing.

---

Missing an attribution, or need a copy of a component's source? Email **support@quynnsoftware.com**.
