import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import Dashboard from '../../pages/Dashboard';
import PropCards from '../../components/modern/PropCards';
import MoneyMaker from '../../components/modern/MoneyMaker';
import EntryTracking from '../../components/modern/EntryTracking';
import Settings from '../../components/modern/Settings';
import useStore from '../../store/useStore';
describe('Accessibility Tests', () => {
    beforeEach(() => {
        // Reset store state;

        store.setProps([]);
        store.opportunities = [];
        store.alerts = [];
        store.darkMode = false;
    });
    it('should have no accessibility violations in App', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));

        expect(results).toHaveNoViolations();
    });
    it('should have no accessibility violations in Dashboard', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(Dashboard, {}) }));

        expect(results).toHaveNoViolations();
    });
    it('should have no accessibility violations in PropCards', async () => {
        const props = [
            {
                player_name: 'John Doe',
                team_abbreviation: 'LAL',
                stat_type: 'POINTS',
                line_value: 20.5,
                pick_count: '1000',
                game_time: '2024-05-31T19:00:00Z',
                winningProp: {
                    type: 'normal',
                    percentage: 0.8,
                    line: 20.5,
                    icon: '⇄',
                    multiplier: 1.95,
                },
            },
        ];
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(PropCards, {}) }));

        expect(results).toHaveNoViolations();
    });
    it('should have no accessibility violations in MoneyMaker', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(MoneyMaker, {}) }));

        expect(results).toHaveNoViolations();
    });
    it('should have no accessibility violations in EntryTracking', async () => {
        const playerProp = {
            id: 'prop-1',
            player: {
                id: 'player-1',
                name: 'John Doe',
                team: {
                    id: 'team-1',
                    name: 'Team A',
                    sport: 'NBA',
                },
            },
            type: 'POINTS',
            line: 20.5,
            odds: 1.95,
            confidence: 0.8,
            timestamp: Date.now(),
        };
        const entries = [
            {
                id: 'entry-1',
                userId: 'user-1',
                status: 'active',
                type: 'single',
                props: [playerProp],
                stake: 100,
                potentialPayout: 195,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                date: new Date().toISOString(),
                legs: [],
                entry: 'entry-1',
                picks: [],
            },
        ];
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(EntryTracking, { entries: entries }) }));

        expect(results).toHaveNoViolations();
    });
    it('should have no accessibility violations in Settings', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(Settings, {}) }));

        expect(results).toHaveNoViolations();
    });
    it('should have proper ARIA labels and roles', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
        // Check navigation;
        expect(container.querySelector('nav')).toHaveAttribute('aria-label', 'Main navigation');
        expect(container.querySelector('main')).toHaveAttribute('role', 'main');
        // Check buttons;

        buttons.forEach(button => {
            expect(button).toHaveAttribute('aria-label');
        });
        // Check form inputs;

        inputs.forEach(input => {
            expect(input).toHaveAttribute('aria-label');
        });
        // Check modal dialogs;

        dialogs.forEach(dialog => {
            expect(dialog).toHaveAttribute('aria-labelledby');
            expect(dialog).toHaveAttribute('aria-describedby');
        });
    });
    it('should have proper color contrast', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
        const results = await axe(container, {
            rules: {
                'color-contrast': { enabled: true },
            },
        });
        expect(results).toHaveNoViolations();
    });
    it('should have proper keyboard navigation', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
        // Check tab indices;

        focusableElements.forEach(element => {
            expect(element).toHaveAttribute('tabindex');
        });
        // Check skip links;

        expect(skipLink).toBeInTheDocument();
        expect(skipLink).toHaveAttribute('tabindex', '0');
    });
    it('should have proper heading hierarchy', async () => {
        const { container } = render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));


        // Check if heading levels are sequential;
        headingLevels.reduce((prevLevel, currentLevel) => {
            expect(currentLevel).toBeLessThanOrEqual(prevLevel + 1);
            return currentLevel;
        }, 0);
    });
});
