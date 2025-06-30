import { useAuth0 } from '@auth0/auth0-react';
import { DashboardIcon, ScaleIcon, SignOutIcon, TimeIcon, UserIcon, WarningIcon, Chart, ListIcon } from '../../assets/Icons';
import './DashboardMenu.css';

import { Menu } from '@ark-ui/react/menu'
import { useState, useRef, useEffect } from 'react';

import { MenuIcon } from '../../assets/Icons';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import logo from '../../assets/qualweb_monitoring_logo.png';

interface DashboardMenuProps {
    monitoring_id : string;
}

function DashboardMenu (props: DashboardMenuProps) {
    const { user, logout } = useAuth0();
    
    const [isOpen, setIsOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setFocusedIndex] = useState(0);
    const menuItemsRef = useRef<(HTMLAnchorElement | HTMLDivElement | null)[]>([]);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // Menu items data for easier management
    const menuItems = [
        { name: "Websites overview", path: `/websites-overview`, icon: ListIcon },
        { name: "Dashboard", path: `/dashboard/${props.monitoring_id}`, icon: DashboardIcon },
        { name: "Current warnings", path: `/dashboard/${props.monitoring_id}/current-warnings`, icon: WarningIcon },
        { name: "Evaluate", path: `/dashboard/${props.monitoring_id}/evaluate`, icon: Chart },
        { name: "Evaluation scheduler", path: `/dashboard/${props.monitoring_id}/scheduler`, icon: TimeIcon },
        { name: "Compare Evaluations", path: `/dashboard/${props.monitoring_id}/select-evaluations`, icon: ScaleIcon },
        { name: "Website Metadata", path: `/dashboard/${props.monitoring_id}/website-metadata`, icon: <Settings /> }
    ];

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            // When opening menu, focus first item after a brief delay
            setTimeout(() => {
                setFocusedIndex(0);
                menuItemsRef.current[0]?.focus();
            }, 100);
        } else {
            // When closing menu, return focus to menu button
            menuButtonRef.current?.focus();
        }
    };

    // Handle keyboard navigation for menu button
    const handleMenuButtonKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                toggleMenu();
                break;
            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    toggleMenu();
                } else {
                    // If menu is open, go to first menu item
                    setFocusedIndex(0);
                    menuItemsRef.current[0]?.focus();
                }
                break;
            case 'Escape':
                if (isOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                    menuButtonRef.current?.focus();
                }
                break;
        }
    };

    // Handle keyboard navigation within the menu
    const handleMenuItemKeyDown = (e: React.KeyboardEvent, index: number) => {
        let nextIndex;
        let prevIndex;
        let lastIndex;
        
        switch (e.key) {
            case 'Tab':
                // Close menu and let tab continue to next element
                setIsOpen(false);
                break;
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = index < menuItems.length ? index + 1 : 0; // Include user menu
                setFocusedIndex(index < menuItems.length ? index + 1 : 0);
                menuItemsRef.current[nextIndex]?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                prevIndex = index > 0 ? index - 1 : menuItems.length; // Include user menu
                setFocusedIndex(prevIndex);
                menuItemsRef.current[prevIndex]?.focus();
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                menuButtonRef.current?.focus();
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                menuItemsRef.current[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                lastIndex = menuItems.length; // User menu is last
                setFocusedIndex(lastIndex);
                menuItemsRef.current[lastIndex]?.focus();
                break;
        }
    };

    // Handle keyboard navigation for user menu trigger
    const handleUserMenuTriggerKeyDown = (e: React.KeyboardEvent, index: number) => {
        let nextIndex;
        let prevIndex;
        let lastIndex;
        
        switch (e.key) {
            case 'Tab':
                // Close menu and let tab continue to next element
                setIsOpen(false);
                break;
            case 'ArrowDown':
                e.preventDefault();
                nextIndex = index < menuItems.length ? index + 1 : 0; // Include user menu
                setFocusedIndex(index < menuItems.length ? index + 1 : 0);
                menuItemsRef.current[nextIndex]?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                prevIndex = index > 0 ? index - 1 : menuItems.length; // Include user menu
                setFocusedIndex(prevIndex);
                menuItemsRef.current[prevIndex]?.focus();
                break;
            case 'Escape':
                e.preventDefault();
                setIsOpen(false);
                menuButtonRef.current?.focus();
                break;
            case 'Home':
                e.preventDefault();
                setFocusedIndex(0);
                menuItemsRef.current[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                lastIndex = menuItems.length; // User menu is last
                setFocusedIndex(lastIndex);
                menuItemsRef.current[lastIndex]?.focus();
                break;
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isOpen && !target.closest('.sidebar-container')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className='sidebar-container'>
            {!isOpen && (
                <button 
                    ref={menuButtonRef}
                    className='menu-button' 
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    onClick={toggleMenu}
                    onKeyDown={handleMenuButtonKeyDown}
                >
                    {MenuIcon}
                </button>
            )}
            {isOpen && (
                <button 
                    ref={menuButtonRef}
                    className='close-menu-button' 
                    aria-label="Close menu"
                    aria-expanded={isOpen}
                    tabIndex={0}
                    onClick={toggleMenu}
                    onKeyDown={handleMenuButtonKeyDown}
                >
                    {MenuIcon}
                </button>
            )}
            {isOpen && (
                <div className='sidebar'>
                    <div className="qwdashboard-logo">
                        <img src={logo} alt="Qualweb Dashboard logo" />
                    </div>
                    <nav className='sidebar-menu' role="navigation" aria-label="Main menu">
                        <ul role="menu">
                            {menuItems.map((item, index) => (
                                <li 
                                    key={index}
                                    role="none"
                                >
                                    <Link 
                                        to={item.path} 
                                        className='list-item' 
                                        role="menuitem"
                                        ref={el => menuItemsRef.current[index] = el}
                                        tabIndex={0}
                                        onKeyDown={(e) => handleMenuItemKeyDown(e, index)}
                                    >
                                        {item.icon}
                                        <strong>{item.name}</strong>
                                    </Link>
                                </li>
                            ))}
                            <li role="none">
                                <div className='list-item' role="menuitem">
                                    <Menu.Root>
                                        <Menu.Trigger
                                            ref={el => menuItemsRef.current[menuItems.length] = el}
                                            tabIndex={0}
                                            onKeyDown={(e) => {
                                                // Handle Escape to prevent it from closing outer menu
                                                if (e.key === 'Escape') {
                                                    e.stopPropagation();
                                                    return;
                                                }
                                                handleUserMenuTriggerKeyDown(e, menuItems.length);
                                            }}
                                        >
                                            {UserIcon}
                                            {user?.name}
                                        </Menu.Trigger>
                                        <Menu.Positioner>
                                            <Menu.Content>
                                                <Menu.Item 
                                                    value="signout" 
                                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                                >
                                                    {SignOutIcon}Sign out
                                                </Menu.Item>
                                            </Menu.Content>
                                        </Menu.Positioner>
                                    </Menu.Root>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className='qualweb-logo'>
                        <img src="/src/assets/qualweb_logo.png" alt="Qualweb evaluator logo" />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DashboardMenu;