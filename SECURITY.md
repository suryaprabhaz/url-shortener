# Security

A URL shortener is abuse-sensitive software.

Production deployments must include authentication for management operations, rate limiting, destination validation, database constraints, abuse reporting and privacy-aware logging.

Never trust aliases, destination URLs or analytics parameters supplied by clients.

Report security issues privately to the repository owner.
