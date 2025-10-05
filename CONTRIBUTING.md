# Contributing to Tactics on Chain

Thank you for your interest in contributing to Tactics on Chain! This document provides guidelines and information for contributors.

## How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in [GitHub Issues](https://github.com/JesterInvestor/tacticsonchain/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Submitting Changes

1. **Fork the Repository**
   ```bash
   # Fork via GitHub UI, then:
   git clone https://github.com/YOUR_USERNAME/tacticsonchain.git
   cd tacticsonchain
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/issue-number-description
   ```

3. **Make Your Changes**
   - Write clear, concise code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run lint      # Check code style
   npm run build     # Ensure it builds
   npm run dev       # Test locally
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add feature: brief description"
   ```
   
   Follow commit message conventions:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting
   - `refactor:` for code restructuring
   - `test:` for adding tests
   - `chore:` for maintenance

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   
   Then create a Pull Request on GitHub with:
   - Clear title and description
   - Reference related issues
   - Screenshots for UI changes
   - List of changes made

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules (`npm run lint`)
- Use functional React components
- Prefer `const` over `let`
- Use meaningful variable names
- Keep functions small and focused

### Component Guidelines

```typescript
// ✅ Good
export function GameBoard({ players }: GameBoardProps) {
  const [activePlayer, setActivePlayer] = useState(0);
  // ...
}

// ❌ Avoid
export default function GameBoard(props: any) {
  var player = 0;
  // ...
}
```

### File Organization

```
src/
├── app/              # Next.js pages
├── components/       # Reusable React components
├── lib/             # Utility functions
├── contracts/       # Smart contracts
└── types/           # TypeScript type definitions
```

### Naming Conventions

- **Files:** `kebab-case.tsx` (e.g., `connect-button.tsx`)
- **Components:** `PascalCase` (e.g., `ConnectButton`)
- **Functions:** `camelCase` (e.g., `handleConnect`)
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_PLAYERS`)

### Smart Contracts

When modifying smart contracts:

1. Test thoroughly on testnet
2. Include gas optimization notes
3. Document all functions
4. Add events for important state changes
5. Consider security implications

### Testing

Currently, we don't have automated tests, but:

- Manually test all changes
- Test on multiple browsers
- Test wallet connections
- Test on mobile devices
- Document test scenarios in PR

## Areas for Contribution

### High Priority

- [ ] Integrate pongstylin/tactics game engine
- [ ] Tournament system implementation
- [ ] Leaderboard functionality
- [ ] Mobile responsiveness improvements
- [ ] Wallet connection error handling

### Medium Priority

- [ ] NFT achievement system
- [ ] Social features (profile, friends)
- [ ] Game replay functionality
- [ ] Performance optimizations
- [ ] Accessibility improvements

### Low Priority

- [ ] Additional game modes
- [ ] Themes and customization
- [ ] Internationalization (i18n)
- [ ] Analytics integration
- [ ] Achievement badges

## Questions?

- 💬 Ask in [GitHub Discussions](https://github.com/JesterInvestor/tacticsonchain/discussions)
- 🐛 Report bugs in [Issues](https://github.com/JesterInvestor/tacticsonchain/issues)
- 📖 Check the [README](./README.md) and [QUICKSTART](./QUICKSTART.md)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Give constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Tactics on Chain! 🎮⛓️
