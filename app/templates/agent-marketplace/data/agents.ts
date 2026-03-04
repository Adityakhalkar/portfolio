export interface Agent {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  creator: string;
  deploys: string;
  price: string;
  category: string;
  status: "live" | "beta";
  rating: number;
  version: string;
  lastUpdated: string;
  tags: string[];
  features: string[];
}

export const CATEGORIES = [
  "ALL",
  "MONITORING",
  "DATA",
  "DEVOPS",
  "NLP",
  "SECURITY",
  "AUTOMATION",
  "TESTING",
] as const;

export const AGENTS: Agent[] = [
  {
    slug: "sentinel",
    name: "SENTINEL",
    description:
      "API monitoring agent that watches your endpoints, tracks uptime, and triggers incident workflows when latency thresholds breach.",
    longDescription:
      "Sentinel continuously monitors your API endpoints with sub-second granularity. It tracks response times, status codes, payload sizes, and error rates across every endpoint in your stack. When anomalies are detected — latency spikes, 5xx surges, unexpected payload changes — Sentinel triggers your incident workflow: PagerDuty, Slack, custom webhooks. It learns your baseline traffic patterns and adapts thresholds automatically, reducing false positives by 73% compared to static alerting. Supports REST, GraphQL, gRPC, and WebSocket endpoints. Deploys as a sidecar or standalone agent.",
    creator: "@devkraft",
    deploys: "12.4k",
    price: "$29/mo",
    category: "MONITORING",
    status: "live",
    rating: 4.8,
    version: "3.2.1",
    lastUpdated: "2026-02-20",
    tags: ["api", "monitoring", "alerting", "uptime", "incident-response"],
    features: [
      "Sub-second endpoint monitoring",
      "Adaptive threshold learning",
      "Multi-protocol support (REST, GraphQL, gRPC)",
      "PagerDuty / Slack / webhook integrations",
      "Historical analytics dashboard",
      "Custom alert routing rules",
    ],
  },
  {
    slug: "scriba",
    name: "SCRIBA",
    description:
      "Document parsing agent for PDFs. Extracts structured data, tables, and metadata with zero config.",
    longDescription:
      "Scriba ingests PDF documents and extracts structured data with near-human accuracy. It handles scanned documents via built-in OCR, recognizes table structures regardless of formatting, and outputs clean JSON with field-level confidence scores. Supports invoices, contracts, research papers, government forms, and financial statements out of the box. Custom extraction templates let you define new document types in minutes. Processes up to 500 pages per minute on standard infrastructure. HIPAA and SOC2 compliant.",
    creator: "@parselab",
    deploys: "8.7k",
    price: "$19/mo",
    category: "DATA",
    status: "live",
    rating: 4.6,
    version: "2.8.0",
    lastUpdated: "2026-02-18",
    tags: ["pdf", "ocr", "extraction", "documents", "data-pipeline"],
    features: [
      "Built-in OCR for scanned documents",
      "Table structure recognition",
      "Field-level confidence scores",
      "Custom extraction templates",
      "500 pages/min throughput",
      "HIPAA and SOC2 compliant",
    ],
  },
  {
    slug: "routr",
    name: "ROUTR",
    description:
      "Intelligent request routing for microservices. Load-balances across regions, handles circuit breaking and failover.",
    longDescription:
      "Routr sits between your API gateway and microservices, making intelligent routing decisions in real-time. It monitors service health, latency, and capacity across regions, then routes each request to the optimal instance. Built-in circuit breaker patterns prevent cascade failures. Supports weighted routing for canary deployments, A/B testing, and gradual rollouts. Latency overhead is under 2ms at p99. Compatible with Kubernetes, ECS, and bare metal deployments.",
    creator: "@meshworks",
    deploys: "6.2k",
    price: "$39/mo",
    category: "DEVOPS",
    status: "live",
    rating: 4.7,
    version: "4.1.0",
    lastUpdated: "2026-02-22",
    tags: ["routing", "microservices", "load-balancing", "circuit-breaker"],
    features: [
      "Real-time health-aware routing",
      "Cross-region load balancing",
      "Circuit breaker patterns",
      "Canary and A/B deployment support",
      "<2ms p99 latency overhead",
      "K8s, ECS, and bare metal compatible",
    ],
  },
  {
    slug: "patchwork",
    name: "PATCHWORK",
    description:
      "Code review agent that catches bugs pre-merge. Runs static analysis, checks for regressions, and comments inline on PRs.",
    longDescription:
      "Patchwork reviews every pull request before your team does. It runs multi-language static analysis, detects common vulnerability patterns (OWASP Top 10), identifies performance regressions, and checks for style guide violations. It comments directly on PR diffs with specific line-level suggestions and severity ratings. Learns from your codebase patterns to reduce false positives over time. Integrates with GitHub, GitLab, and Bitbucket. Average review time: 45 seconds for PRs under 500 lines.",
    creator: "@codeforge",
    deploys: "15.1k",
    price: "$49/mo",
    category: "SECURITY",
    status: "live",
    rating: 4.9,
    version: "5.0.2",
    lastUpdated: "2026-02-24",
    tags: ["code-review", "security", "static-analysis", "github", "ci-cd"],
    features: [
      "Multi-language static analysis",
      "OWASP Top 10 detection",
      "Inline PR comments with severity",
      "Codebase pattern learning",
      "GitHub / GitLab / Bitbucket",
      "45s average review for <500 LOC",
    ],
  },
  {
    slug: "herald",
    name: "HERALD",
    description:
      "Smart customer notification delivery. Routes alerts across email, SMS, push, and Slack based on user preference graphs.",
    longDescription:
      "Herald manages your entire notification pipeline. It accepts notification events from your backend and routes them to the right channel at the right time based on user preference graphs, timezone awareness, and delivery optimization. It deduplicates similar notifications, batches low-priority updates into digests, and escalates critical alerts through fallback channels. Built-in analytics track open rates, click-through, and delivery success across every channel. Supports email, SMS, push notifications, Slack, Discord, and webhooks.",
    creator: "@notifyco",
    deploys: "4.8k",
    price: "$24/mo",
    category: "NLP",
    status: "beta",
    rating: 4.3,
    version: "1.4.0",
    lastUpdated: "2026-02-15",
    tags: ["notifications", "email", "sms", "push", "multi-channel"],
    features: [
      "User preference graph routing",
      "Timezone-aware delivery",
      "Smart dedup and digest batching",
      "Multi-channel fallback escalation",
      "Delivery analytics dashboard",
      "Email, SMS, push, Slack, Discord",
    ],
  },
  {
    slug: "census",
    name: "CENSUS",
    description:
      "Real-time database sync pipeline agent. Keeps Postgres, Mongo, and Redis in lockstep without manual migration scripts.",
    longDescription:
      "Census watches your databases and keeps them synchronized in real-time. It captures change events from Postgres WAL, MongoDB oplog, and Redis keyspace notifications, then propagates changes to downstream systems with exactly-once delivery guarantees. Handles schema evolution automatically — new columns, renamed fields, and type changes propagate without downtime. Built-in conflict resolution for multi-master setups. Dashboard shows sync lag, throughput, and data integrity metrics. Processes 50,000 events per second on standard infrastructure.",
    creator: "@dataflow",
    deploys: "9.3k",
    price: "$34/mo",
    category: "DATA",
    status: "live",
    rating: 4.7,
    version: "3.0.1",
    lastUpdated: "2026-02-21",
    tags: ["database", "sync", "postgres", "mongodb", "redis", "cdc"],
    features: [
      "Real-time CDC from Postgres, Mongo, Redis",
      "Exactly-once delivery guarantee",
      "Automatic schema evolution",
      "Multi-master conflict resolution",
      "50k events/sec throughput",
      "Sync lag and integrity dashboard",
    ],
  },
  {
    slug: "lockbox",
    name: "LOCKBOX",
    description:
      "Secret rotation agent. Automatically rotates API keys, database credentials, and certificates on schedule or on breach detection.",
    longDescription:
      "Lockbox automates secret lifecycle management. It rotates API keys, database passwords, TLS certificates, and OAuth tokens on configurable schedules — or immediately when a breach is detected. Integrates with AWS Secrets Manager, HashiCorp Vault, Azure Key Vault, and GCP Secret Manager. Zero-downtime rotation using dual-credential strategies. Audit trail logs every rotation with before/after hashes. Alert pipeline notifies on rotation failures with automatic rollback.",
    creator: "@vaultops",
    deploys: "7.1k",
    price: "$44/mo",
    category: "SECURITY",
    status: "live",
    rating: 4.8,
    version: "2.5.0",
    lastUpdated: "2026-02-19",
    tags: ["secrets", "rotation", "security", "vault", "credentials"],
    features: [
      "Scheduled + breach-triggered rotation",
      "AWS / Vault / Azure / GCP integration",
      "Zero-downtime dual-credential strategy",
      "Complete audit trail",
      "Automatic rollback on failure",
      "Certificate and OAuth token support",
    ],
  },
  {
    slug: "ghost-writer",
    name: "GHOST_WRITER",
    description:
      "API documentation agent. Watches your codebase, auto-generates OpenAPI specs and human-readable docs from source code.",
    longDescription:
      "Ghost Writer scans your API codebase and generates comprehensive documentation automatically. It parses route handlers, middleware, request/response types, validation schemas, and error codes to produce accurate OpenAPI 3.1 specs. Generates human-readable documentation with code examples in multiple languages. Watches for code changes and updates docs in real-time. Supports Express, FastAPI, NestJS, Go Chi, and Rails out of the box. Deploys a hosted docs portal or exports static Markdown.",
    creator: "@docsmith",
    deploys: "5.9k",
    price: "$19/mo",
    category: "AUTOMATION",
    status: "live",
    rating: 4.5,
    version: "2.1.3",
    lastUpdated: "2026-02-17",
    tags: ["documentation", "openapi", "api-docs", "automation", "code-gen"],
    features: [
      "Auto-generates OpenAPI 3.1 specs",
      "Multi-language code examples",
      "Real-time doc updates on code change",
      "Express / FastAPI / NestJS / Go / Rails",
      "Hosted portal or static Markdown export",
      "Request/response type extraction",
    ],
  },
  {
    slug: "vigil",
    name: "VIGIL",
    description:
      "Log anomaly detection agent. Ingests structured logs, learns normal patterns, and surfaces anomalies before they become incidents.",
    longDescription:
      "Vigil ingests your structured logs and builds behavioral models of normal system operation. When patterns deviate — unusual error rates, new exception types, traffic shape changes, deployment-correlated anomalies — Vigil flags them with context-rich alerts. No rule writing required. It correlates anomalies across services to surface root causes, not just symptoms. Supports JSON logs, syslog, and custom formats. Integrates with ELK, Datadog, Grafana, and CloudWatch. Processes 100k log lines per second.",
    creator: "@logmind",
    deploys: "3.4k",
    price: "$39/mo",
    category: "MONITORING",
    status: "beta",
    rating: 4.2,
    version: "1.2.0",
    lastUpdated: "2026-02-12",
    tags: ["logs", "anomaly-detection", "monitoring", "observability"],
    features: [
      "Behavioral pattern learning",
      "Cross-service anomaly correlation",
      "No rule writing required",
      "ELK / Datadog / Grafana / CloudWatch",
      "100k log lines/sec throughput",
      "Deployment-aware anomaly detection",
    ],
  },
  {
    slug: "forge",
    name: "FORGE",
    description:
      "CI pipeline optimizer. Analyzes your build graph, parallelizes jobs, caches aggressively, and cuts pipeline times by 40-60%.",
    longDescription:
      "Forge analyzes your CI/CD pipeline graph and optimizes it for speed. It identifies parallelizable jobs, implements intelligent caching strategies, detects flaky tests and quarantines them, and reorders job execution based on failure probability. Works with GitHub Actions, GitLab CI, CircleCI, and Jenkins. Average improvement: 47% reduction in pipeline duration. Dashboard shows per-job timing breakdown, cache hit rates, and optimization history. No pipeline config changes required — Forge operates as a layer on top of your existing setup.",
    creator: "@pipeops",
    deploys: "4.2k",
    price: "$34/mo",
    category: "DEVOPS",
    status: "live",
    rating: 4.6,
    version: "2.3.0",
    lastUpdated: "2026-02-23",
    tags: ["ci-cd", "optimization", "caching", "builds", "github-actions"],
    features: [
      "Build graph analysis and parallelization",
      "Intelligent caching strategies",
      "Flaky test detection and quarantine",
      "47% avg pipeline time reduction",
      "GitHub Actions / GitLab / CircleCI / Jenkins",
      "Zero config changes required",
    ],
  },
  {
    slug: "babel",
    name: "BABEL",
    description:
      "Translation agent for technical content. Translates docs, changelogs, and UI strings while preserving code blocks and formatting.",
    longDescription:
      "Babel translates technical content with code-awareness. Unlike generic translation, it preserves code blocks, variable names, CLI commands, and API references untouched. Handles Markdown, MDX, JSON i18n files, and YAML. Supports 42 languages with context-aware translation that understands technical terminology. Batch mode processes entire documentation sites. Review mode generates side-by-side diffs for human review. Integrates with Crowdin, Phrase, and Lokalise for existing localization workflows.",
    creator: "@lingolabs",
    deploys: "2.8k",
    price: "$29/mo",
    category: "NLP",
    status: "live",
    rating: 4.4,
    version: "1.8.0",
    lastUpdated: "2026-02-16",
    tags: ["translation", "i18n", "localization", "docs", "multilingual"],
    features: [
      "Code-aware translation (preserves syntax)",
      "42 languages supported",
      "Markdown / MDX / JSON / YAML",
      "Batch mode for doc sites",
      "Side-by-side review diffs",
      "Crowdin / Phrase / Lokalise integration",
    ],
  },
  {
    slug: "specter",
    name: "SPECTER",
    description:
      "E2E test generation agent. Crawls your app, maps user flows, and generates Playwright test suites automatically.",
    longDescription:
      "Specter crawls your web application, maps every user flow, and generates comprehensive Playwright test suites. It identifies critical paths (signup, checkout, onboarding), edge cases (empty states, error handling), and regression-prone areas. Generated tests include visual regression checks, accessibility audits, and performance assertions. Updates tests automatically when your UI changes. Supports React, Vue, Angular, and server-rendered applications. Average coverage: 78% of user-facing functionality from a single crawl.",
    creator: "@testcraft",
    deploys: "6.5k",
    price: "$44/mo",
    category: "TESTING",
    status: "live",
    rating: 4.7,
    version: "3.1.0",
    lastUpdated: "2026-02-24",
    tags: ["testing", "e2e", "playwright", "test-generation", "automation"],
    features: [
      "Automatic user flow mapping",
      "Playwright test suite generation",
      "Visual regression checks",
      "Accessibility audit assertions",
      "Auto-updates on UI changes",
      "78% avg coverage from single crawl",
    ],
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}

export function getAgentsByCategory(category: string): Agent[] {
  if (category === "ALL") return AGENTS;
  return AGENTS.filter((a) => a.category === category);
}

export function getFeaturedAgents(): Agent[] {
  return AGENTS.slice(0, 6);
}
